# Avis et alertes – Ville de Montréal

Application React reproduisant la page des avis et alertes de la Ville de Montréal.

## Étudiant

Drabo Adam Abdoul-Karim

## Installation et démarrage

### Étapes

1. Cloner le dépôt :
   git clone https://github.com/adamdrabo/alerte-ville-mtl.git
   cd alertesavis

2. Installer les dépendances :
   npm install

3. Lancer le serveur de développement :
   npm run dev

4. Ouvrir dans le navigateur :
   http://localhost:5173

## Choix techniques

### Structure CSS
Tout le CSS est regroupé dans deux fichiers : `index.css` pour les variables globales et le reset, et `App.css` pour l'ensemble des composants organisés par sections commentées. Ce choix évite la fragmentation excessive pour un projet de cette taille tout en maintenant une bonne lisibilité.

### Découplage des données
Les données fictives sont isolées dans `src/services/alertes.js` qui expose deux fonctions asynchrones : `getAlertes()` et `getAlerteById()`. Les composants ne connaissent pas la source des données — ils consomment uniquement ces fonctions. Ce découplage facilitera le remplacement par une vraie API au projet 2.

### Données fictives
Les 20 alertes fictives sont basées sur les vrais avis publiés sur montreal.ca/avis-et-alertes, complétées par des alertes inventées dans le même style. Elles couvrent 7 arrondissements et 8 sujets différents.

### Gestion de l'état
L'état est géré uniquement avec `useState` et `useEffect` natifs de React, sans bibliothèque externe. Les filtres sont contrôlés par la page `Accueil` et transmis à `FiltresAlertes` via les props.

### Routage
`react-router-dom` v7 est utilisé pour le routage côté client. La page de détail est accessible via l'URL `/alertes/:id`, ce qui permet le partage de lien et le rafraîchissement de page.

### Responsive
L'interface est adaptée aux mobiles à partir de 360px avec un breakpoint à 768px pour la version bureau.