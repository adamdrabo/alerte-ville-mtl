# Avis et alertes – Ville de Montréal

Application React reproduisant la page des avis et alertes de la Ville de Montréal, transformée en PWA installable et fonctionnant hors connexion.

## Étudiant

Adam Drabo

## Installation et démarrage

### Prérequis
- Node.js (v18 ou plus)
- npm

### Étapes

1. Cloner le dépôt :
   git clone <url-du-depot>
   cd alertesavis

2. Installer les dépendances :
   npm install

3. Lancer le serveur de développement :
   npm run dev

4. Ouvrir dans le navigateur :
   http://localhost:5173

## Choix techniques

### Structure CSS
Tout le CSS est regroupé dans deux fichiers : `index.css` pour les variables globales et le reset, et `App.css` pour l'ensemble des composants organisés par sections commentées.

### Découplage des données
Les données proviennent de l'API officielle de la Ville de Montréal. Une fonction de normalisation isolée dans `src/services/alertes.js` convertit la réponse brute de l'API vers le modèle interne de l'application. Ce découplage facilitera le remplacement de la source de données au projet 3.

### API utilisée
https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=fc6e5f85-7eba-451c-8243-bdf35c2ab336&limit=100

### Gestion de l'état
L'état est géré uniquement avec `useState` et `useEffect` natifs de React, sans bibliothèque externe. Les filtres enrichis supportent la sélection multiple pour les arrondissements et les sujets.

### Routage
`react-router-dom` v7 est utilisé pour le routage côté client. La page de détail est accessible via l'URL `/alertes/:id`.

### Responsive
L'interface est adaptée aux mobiles à partir de 360px avec un breakpoint à 768px pour la version bureau.

## Stratégie de mise en cache

Deux stratégies sont utilisées dans `public/sw.js` :

### Assets statiques — Cache First
Les fichiers JS, CSS et HTML sont précachés à l'installation du Service Worker. Lors d'une requête, le cache est consulté en premier. Si la ressource est absente du cache, elle est récupérée depuis le réseau et mise en cache dynamiquement.

Cette stratégie est choisie car les assets statiques changent rarement et doivent être disponibles hors connexion.

### Données API — Stale-While-Revalidate
Les requêtes vers l'API de la Ville sont servies depuis le cache immédiatement, pendant que le Service Worker va chercher une version fraîche en arrière-plan et met à jour le cache.

Cette stratégie est choisie car elle offre un affichage instantané des données tout en assurant leur fraîcheur à la prochaine consultation.

## Fonctionnalités PWA

- Installable sur iOS (Safari) et Android (Chrome)
- Fonctionne hors connexion grâce au Service Worker
- Les derniers avis téléchargés restent consultables sans réseau
- Navigation entre l'accueil et la page de détail fonctionnelle hors connexion

## Scores Lighthouse

![Scores Lighthouse](lighthouse-scores.png)

- Performance : 100
- Accessibility : 90
- Best Practices : 100
- SEO : 82