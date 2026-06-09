function extraireArrondissement(titre) {
    if(!titre) {
        return ""
    }

    const patterns = [
    /arrondissement\s+d[e']\s+([^,.\-–]+)/i,
    /arrondissement\s+([^,.\-–]+)/i,
    /arr\.\s+d[e']\s+([^,.\-–]+)/i,
    /arr\.\s+([^,.\-–]+)/i,
    ]

    for (const pattern of patterns) {
        const match = titre.match(pattern)
        if (match) {
            return match[1].trim()
        }

        return ""
    }

}  

 function mapDonneApi(enregistrement) {
        return {
        id: String(enregistrement._id),
        titre: enregistrement.titre,
        arrondissement: extraireArrondissement(enregistrement.titre),
        sujet: enregistrement.type,
        dateEmission: enregistrement.date_debut
        ? enregistrement.date_debut.split("T")[0]
        : "",
        resume: enregistrement.titre,
        description: enregistrement.titre,
        lien: enregistrement.lien,
        }   
    }

module.exports = { mapDonneApi }