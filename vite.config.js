import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Avis et alertes Montréal',
        short_name: 'Avis MTL',
        theme_color: '#bb2649',
        icons: [
          { src: '/icons/launchericon-192x192.png', sizes: '192x192', type: 'image/png'},
          { src: '/icons/launchericon-512x512.png', sizes: '512x512', type: 'image/png'},
          { src: '/icons/launchericon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable'}
        ]
      }
    })
  ],
})
