import { useState, useEffect } from "react";

const BACKEND_URL = "https://avis-alertes-backend.onrender.com"

function ModaleAbonnement({ onFermer }) {

    const [statut, setStatut] = useState("initial")

    const [message, setMessage] = useState("")

    useEffect(() => {
        function hanfleEsc(e) {
            if (e.key === "Escape") onFermer()
        }
        
        window.addEventListener("keydown", hanfleEsc)

        return () => window.removeEventListener("keydown", hanfleEsc)
    },[onFermer])

    useEffect(() => {
    async function verifierAbonnement() {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        setStatut("indisponible")
        return
      }

      if (Notification.permission === "denied") {
        setStatut("bloqué")
        return;
      }

      try {
        const registration = await navigator.serviceWorker.ready;
        const abonnement = await registration.pushManager.getSubscription()
        if (abonnement) {
          setStatut("abonne");
        } else {
          setStatut("nonAbonne");
        }
      } catch (err) {
        setStatut("erreur");
        setMessage(err.message);
      }
    }

    verifierAbonnement();
    }, [])

    async function handleAbonner() {
    setStatut("chargement");

    try {
      const permission = await Notification.requestPermission();

      if (permission === "denied") {
        setStatut("refuse");
        return;
      }

      if (permission !== "granted") {
        setStatut("refuse");
        return;
      }

      //VAPID dbackend
      const reponseVapid = await fetch(`${BACKEND_URL}/vapid-public-key`);
      const { data: vapidPublicKey } = await reponseVapid.json();

      //push
      const registration = await navigator.serviceWorker.ready;
      const abonnement = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey
      });

      // Envoie l'abonnement au backend
      await fetch(`${BACKEND_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: abonnement })
      });

      setStatut("abonne");

    } catch (err) {
      setStatut("erreur");
      setMessage(err.message);
    }
    }

    async function handleDesabonner() {
    setStatut("chargement");

    try {
      const registration = await navigator.serviceWorker.ready;
      const abonnement = await registration.pushManager.getSubscription();

      if (abonnement) {
        await abonnement.unsubscribe();

        await fetch(`${BACKEND_URL}/unsubscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: abonnement.endpoint })
        });
      }

      setStatut("nonAbonne");

    } catch (err) {
      setStatut("erreur");
      setMessage(err.message);
    }
    }

    return (
    <div className="modale-overlay" onClick={onFermer}>
      <div className="modale-contenu" onClick={(e) => e.stopPropagation()}>

        
        <button className="modale-fermer" onClick={onFermer} aria-label="Fermer">✕</button>

        
        <h2 className="modale-titre">S'abonner aux alertes</h2>

       
        <p className="modale-texte">
          Recevez des notifications push directement sur votre appareil
          dès qu'un nouvel avis est émis par la Ville de Montréal.
          Vous pouvez vous désabonner à tout moment.
        </p>

        
        {statut === "initial" && (
          <p className="modale-info">Vérification en cours...</p>
        )}

        {statut === "chargement" && (
          <p className="modale-info">Opération en cours...</p>
        )}

        {statut === "nonAbonne" && (
          <button className="modale-btn-abonner" onClick={handleAbonner}>
            S'abonner aux notifications
          </button>
        )}

        {statut === "abonne" && (
          <div>
            <p className="modale-succes">✓ Vous êtes abonné aux notifications</p>
            <button className="modale-btn-desabonner" onClick={handleDesabonner}>
              Se désabonner
            </button>
          </div>
        )}

        {statut === "refuse" && (
          <p className="modale-erreur">
            Vous avez refusé les notifications. Veuillez réessayer et accepter la permission.
          </p>
        )}

        {statut === "bloque" && (
          <p className="modale-erreur">
            Les notifications sont bloquées dans votre navigateur.
            Allez dans les paramètres de votre navigateur pour les débloquer.
          </p>
        )}

        {statut === "indisponible" && (
          <p className="modale-erreur">
            Les notifications push ne sont pas disponibles sur cet appareil ou navigateur.
          </p>
        )}

        {statut === "erreur" && (
          <p className="modale-erreur">
            Une erreur est survenue : {message}
          </p>
        )}

      </div>
    </div>
    )
}

export default ModaleAbonnement;
