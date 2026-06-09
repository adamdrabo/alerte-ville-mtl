
const BACKEND_URL = "https://avis-alertes-backend.onrender.com"

export async function getAlertes() {
  const reponse = await fetch(`${BACKEND_URL}/avis-alertes`)

  if(!reponse.ok) {
    throw new Error(`Erreur de serveru: ${reponse.status}`)
  }

  const donnees = await reponse.json()
  return donnees.data
}



export async function getAlerteByID(id) {
    const alertes = await getAlertes()
    
    for(let i = 0; i < alertes.length; i++) {
        if(alertes[i].id === id) {
            return alertes[i]
        }
    }
    return null
}

