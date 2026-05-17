
const ARRONDISSEMENTS = [
  "Ahuntsic-Cartierville",
  "Anjou",
  "Côte-des-Neiges–Notre-Dame-de-Grâce",
  "L'Île-Bizard–Sainte-Geneviève",
  "Lachine",
  "LaSalle",
  "Le Plateau-Mont-Royal",
  "Le Sud-Ouest",
  "Mercier–Hochelaga-Maisonneuve",
  "Montréal-Nord",
  "Outremont",
  "Pierrefonds-Roxboro",
  "Rivière-des-Prairies–Pointe-aux-Trembles",
  "Rosemont–La Petite-Patrie",
  "Saint-Laurent",
  "Saint-Léonard",
  "Verdun",
  "Ville-Marie",
  "Villeray–Saint-Michel–Parc-Extension",
];

const SUJETS = [
  "Circulation et transport",
  "Complexes sportifs",
  "Déchets et recyclage",
  "Déneigement",
  "Eau et aqueduc",
  "Parcs et bâtiments municipaux",
  "Séances publiques",
  "Stationnement",
  "Urgence",
];

function FiltresAlertes({ filtres, onFiltreChange, onEffacer }) {
  return (
    <div className="filtres">

    
      <div className="filtres-recherche">
        <label htmlFor="recherche" className="filtres-label">
          Rechercher par mot-clé
        </label>
        <div className="filtres-recherche-input-wrapper">
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="filtres-icone-loupe" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            id="recherche"
            className="filtres-recherche-input"
            placeholder="Que cherchez-vous?"
            autoComplete="off"
            value={filtres.recherche}
            onChange={(e) => onFiltreChange("recherche", e.target.value)}
          />
        </div>
      </div>

     
      <div className="filtres-controles">

       
        <select
          className="filtres-select"
          value={filtres.arrondissement}
          onChange={(e) => onFiltreChange("arrondissement", e.target.value)}
          aria-label="Filtrer par arrondissement"
        >
          <option value="">Arrondissement</option>
          {ARRONDISSEMENTS.map((arr) => (
            <option key={arr} value={arr}>{arr}</option>
          ))}
        </select>

       
        <input
          type="date"
          className="filtres-date"
          value={filtres.dateDebut}
          onChange={(e) => onFiltreChange("dateDebut", e.target.value)}
          aria-label="Date de début"
        />

      
        <input
          type="date"
          className="filtres-date"
          value={filtres.dateFin}
          onChange={(e) => onFiltreChange("dateFin", e.target.value)}
          aria-label="Date de fin"
        />

        
        <select
          className="filtres-select"
          value={filtres.sujet}
          onChange={(e) => onFiltreChange("sujet", e.target.value)}
          aria-label="Filtrer par sujet"
        >
          <option value="">Sujet</option>
          {SUJETS.map((sujet) => (
            <option key={sujet} value={sujet}>{sujet}</option>
          ))}
        </select>

       
        <button
          type="button"
          className="filtres-effacer"
          onClick={onEffacer}
        >
          Tout effacer
        </button>

      </div>
    </div>
  );
}

export default FiltresAlertes;