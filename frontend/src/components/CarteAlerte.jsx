
import { Link } from "react-router-dom";

function CarteAlerte({ alerte }) {
  return (
    <li className="carte-alerte">
      <Link to={`/alertes/${alerte.id}`} className="carte-alerte-lien">

        <div className="carte-alerte-titre">{alerte.titre}</div>

        <span className="carte-alerte-badge">{alerte.sujet}</span>

        <div className="carte-alerte-resume">{alerte.resume}</div>

        <ul className="carte-alerte-meta">
          <li className="carte-alerte-meta-item">
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="carte-alerte-icone" aria-hidden="true">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
            </svg>
            <span>{alerte.dateEmission}</span>
          </li>
        </ul>

      </Link>
    </li>
  );
}

export default CarteAlerte