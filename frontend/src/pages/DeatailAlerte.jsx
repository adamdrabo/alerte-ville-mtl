import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import { getAlerteByID } from "../service/alertes";
function DetailAlerte() {
  const { id } = useParams();
  const [alerte, setAlerte] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    getAlerteByID(id).then((donnees) => {
      setAlerte(donnees);
      setChargement(false);
    });
  }, [id]);

  return (
    <div className="page-detail">

      <Header />

      <div className="detail-contenu">

        <Link to="/" className="detail-retour">
          ← Retour aux avis et alertes
        </Link>

        
        {chargement && (
          <div className="accueil-chargement">
            <div className="accueil-spinner"></div>
            <p>Chargement de l'alerte...</p>
          </div>
        )}

        {!chargement && !alerte && (
          <div className="detail-introuvable">
            <h1>Alerte introuvable</h1>
            <p>Cette alerte n'existe pas ou a été supprimée.</p>
            <Link to="/" className="detail-retour">
              ← Retour aux avis et alertes
            </Link>
          </div>
        )}

        {!chargement && alerte && (
          <article className="detail-article">

            
            <span className="carte-alerte-badge">{alerte.sujet}</span>

            
            <h1 className="detail-titre">{alerte.titre}</h1>

          
            <div className="detail-meta">
              <div className="detail-meta-item">
                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="carte-alerte-icone" aria-hidden="true">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                </svg>
                <span>{alerte.dateEmission}</span>
              </div>
              <div className="detail-meta-item">
               
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="carte-alerte-icone" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>{alerte.arrondissement}</span>
              </div>
            </div>

           
            <hr className="detail-separateur" />

           
            <div className="detail-description">
              <p>{alerte.description}</p>
            </div>

          </article>
        )}

      </div>
    </div>
  );
}

export default DetailAlerte;