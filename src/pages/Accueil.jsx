
import { useState, useEffect } from "react";
import Header from "../components/Header";
import FiltresAlertes from "../components/FiltresAlertes";
import CarteAlerte from "../components/CarteAlerte";
import { getAlertes } from "../service/alertes";

function Accueil() {
  const [alertes, setAlertes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [filtres, setFiltres] = useState({
    recherche: "",
    arrondissements:[],
    dateDebut: "",
    dateFin: "",
    sujets: [],
  });
  const [erreur, setErreur] = useState(null)

  
  useEffect(() => {
    getAlertes().then((donnees) => {
      setAlertes(donnees);
      setChargement(false);
    })
    .catch((err) => {
      setErreur(err.message)
      setChargement(false)
    })
  }, []);

 
  function handleFiltreChange(nom, valeur) {
    setFiltres((prev) => ({ ...prev, [nom]: valeur }));
  }

  function handleFiltreMultiple(nom, valeur) {
    setFiltres((prev) => {
      const liste = prev[nom]

      const nouvelleListe = liste.includes(valeur) ? liste.filter((v) => v !== valeur) : [...liste, valeur]
      return { ...prev, [nom]: nouvelleListe }
    })
  }

  function handleEffacer() {
    setFiltres({
      recherche: "",
      arrondissements: [],
      dateDebut: "",
      dateFin: "",
      sujets: [],
    });
  }

  function normaliser(texte) {
    return texte
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  const alertesFiltrees = alertes.filter((alerte) => {
    if (filtres.recherche) {
      const recherche = normaliser(filtres.recherche);
      const titre = normaliser(alerte.titre);
      if (!titre.includes(recherche)) return false;
    }

   
    if (filtres.arrondissements.length > 0) {
      if (!filtres.arrondissements.includes(alerte.arrondissement)) return false;
    }

   
    if (filtres.dateDebut) {
      if (alerte.dateEmission < filtres.dateDebut) return false;
    }

    
    if (filtres.dateFin) {
      if (alerte.dateEmission > filtres.dateFin) return false;
    }

    
    if (filtres.sujets.length > 0) {
      if (!filtres.sujets.includes(alerte.sujet)) return false;
    }

    return true;
  });

  return (
    <div className="page-accueil">

      
      <Header />

      
      <div className="hero">
        <div className="hero-contenu">
          <h1 className="hero-titre">Avis et alertes</h1>
          <p className="hero-sous-titre">Trouver un avis</p>
          <FiltresAlertes
            filtres={filtres}
            onFiltreChange={handleFiltreChange}
            onFiltreMultiple={handleFiltreMultiple}
            onEffacer={handleEffacer}
          />
        </div>
      </div>

      <div className="accueil-contenu">

       
        <div className="accueil-liste">

          {!chargement && (
            <p className="accueil-compteur">
              {alertesFiltrees.length === 0
                ? "Aucun résultat"
                : `${alertesFiltrees.length} résultat${alertesFiltrees.length > 1 ? "s" : ""}`}
            </p>
          )}

          {chargement && (
            <div className="accueil-chargement">
              <div className="accueil-spinner"></div>
              <p>Chargement des alertes...</p>
            </div>
          )}

          {!chargement && alertesFiltrees.length > 0 && (
            <ul className="accueil-alertes">
              {alertesFiltrees.map((alerte) => (
                <CarteAlerte key={alerte.id} alerte={alerte} />
              ))}
            </ul>
          )}

          {!chargement && alertesFiltrees.length === 0 && (
            <div className="accueil-vide">
              <p>Aucune alerte ne correspond à vos critères de recherche.</p>
              <button
                type="button"
                className="filtres-effacer"
                onClick={handleEffacer}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {erreur && (
            <div className="acceuil-erreur">
               <p>Impossible de charger les alertes.</p> 
               <p className="acceuil-erreur-detail">{erreur}</p>
               <button
               type="button"
               className="filtres-effacer"
               onClick={() => window.location.reload()}
               >
                Réessayer
               </button>
            </div>
          )}

        </div>

        <aside className="accueil-sidebar">
          <div className="sidebar-abonnement">
            <h2 className="sidebar-titre">S'abonner aux alertes</h2>
            <p className="sidebar-texte">
              Pour recevoir des avis et alertes par courriel ou texto,
              vous devez avoir créé un compte.
            </p>
            <button
              type="button"
              className="sidebar-btn"
              onClick={() => alert("Cette fonctionnalité n'est pas encore disponible.")}
            >
              M'abonner →
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default Accueil;