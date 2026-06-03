// Configuration

const CACHE_STATIQUE = 'avis-mtl-v3'
const CACHE_DYNAMIQUE = 'dynamic-v3'
const CACHE_API = 'api-v3'

const ASSETS = ['/', '/index.html', '/manifest.webmanifest'];

const API = /donnees\.montreal\.ca/

// Mise en cache des ressources statiques

self.addEventListener('install', Event => {
    Event.waitUntil(
        caches.open(CACHE_STATIQUE).then(
            cache => cache.addAll(ASSETS)
        )
    )
    self.skipWaiting()
})

// Nettoyage du vieux cache

self.addEventListener('activate', event => {
    const cachesActuels = [CACHE_STATIQUE, CACHE_DYNAMIQUE, CACHE_API]

    event.waitUntil(
        caches.keys().then(
            clefs =>
                Promise.all(
                    clefs
                    .filter(c => !cachesActuels.includes(c))
                    .map(c => caches.delete(c))
                )
        )
    )
    self.clients.claim()
})

//  Stale-While-Revalidate

self.addEventListener('fetch', event => {
    if(event.request.method !== 'GET') return
    if(!API.test(event.request.url)) return

    event.respondWith(
        caches.open(CACHE_API).then(
            cache => 
                cache.match(event.request).then(
                    cached => {
                        const reseau = fetch(event.request).then(
                            res => {
                                cache.put(event.request,  res.clone())
                                return res
                            }
                        ).catch(() => cached)
                        return cached || reseau
                    }
                )
        )
    )
})

// stratégie assets statiques : Cache First

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (API.test(event.request.url)) return;

  event.respondWith(
    caches.match(event.request).then(
        r => {
      if (r) return r;

      return fetch(event.request).then(
        res => {
        const clone = res.clone();
        caches.open(CACHE_DYNAMIQUE).then(
            c => 
                c.put(event.request, clone)
        )
        return res;
      })
    })
  )
})