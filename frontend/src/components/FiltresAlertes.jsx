
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

function FiltresAlertes({ filtres, onFiltreChange, onFiltreMultiple, onEffacer }) {
  return (
    <div className="filtres">

      {/* Recherche */}
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

      {/* Filtres */}
      <div className="filtres-controles">

        {/* Arrondissements — sélection multiple */}
        <div className="filtres-groupe">
          <p className="filtres-groupe-label">Arrondissement</p>
          <div className="filtres-options">
            {ARRONDISSEMENTS.map((arr) => (
              <label key={arr} className="filtres-option">
                <input
                  type="checkbox"
                  className="filtres-checkbox"
                  checked={filtres.arrondissements.includes(arr)}
                  onClick={() => onFiltreMultiple("arrondissements", arr)}
                  onChange={() => {}}
                />
                <span>{arr}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dates */}
        <div className="filtres-groupe">
          <p className="filtres-groupe-label">Date</p>
          <div className="filtres-dates">
            <div className="filtres-date-wrapper">
              <label htmlFor="dateDebut" className="filtres-date-label">Du</label>
              <input
                type="date"
                id="dateDebut"
                className="filtres-date"
                value={filtres.dateDebut}
                onChange={(e) => onFiltreChange("dateDebut", e.target.value)}
                aria-label="Date de début"
              />
            </div>
            <div className="filtres-date-wrapper">
              <label htmlFor="dateFin" className="filtres-date-label">Au</label>
              <input
                type="date"
                id="dateFin"
                className="filtres-date"
                value={filtres.dateFin}
                onChange={(e) => onFiltreChange("dateFin", e.target.value)}
                aria-label="Date de fin"
              />
            </div>
          </div>
        </div>

        {/* Sujets — sélection multiple */}
        <div className="filtres-groupe">
          <p className="filtres-groupe-label">Sujet</p>
          <div className="filtres-options">
            {SUJETS.map((sujet) => (
              <label key={sujet} className="filtres-option">
                <input
                  type="checkbox"
                  className="filtres-checkbox"
                  checked={filtres.sujets.includes(sujet)}
                  onClick={() => onFiltreMultiple("sujets", sujet)}
                  onChange={() => {}}
                />
                <span>{sujet}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tout effacer */}
        <button
          type="button"
          className="filtres-effacer"
          onClick={onEffacer}
        >
          Tout effacer
        </button>

      </div>

      {/* Chips — filtres actifs */}
      {(filtres.arrondissements.length > 0 || filtres.sujets.length > 0 || filtres.dateDebut || filtres.dateFin) && (
        <div className="filtres-chips">
          <span className="filtres-chips-label">Filtres actifs :</span>

          {filtres.arrondissements.map((arr) => (
            <button
              key={arr}
              type="button"
              className="chip-actif"
              onClick={() => onFiltreMultiple("arrondissements", arr)}
            >
              {arr} ✕
            </button>
          ))}

          {filtres.sujets.map((sujet) => (
            <button
              key={sujet}
              type="button"
              className="chip-actif"
              onClick={() => onFiltreMultiple("sujets", sujet)}
            >
              {sujet} ✕
            </button>
          ))}

          {filtres.dateDebut && (
            <button
              type="button"
              className="chip-actif"
              onClick={() => onFiltreChange("dateDebut", "")}
            >
              Du {filtres.dateDebut} ✕
            </button>
          )}

          {filtres.dateFin && (
            <button
              type="button"
              className="chip-actif"
              onClick={() => onFiltreChange("dateFin", "")}
            >
              Au {filtres.dateFin} ✕
            </button>
          )}
        </div>
      )}

    </div>
  );
}

export default FiltresAlertes;