const express = require('express')
const axios = require('axios')
const { mapDonneApi } = require('../utils/normaliser')

const router = express.Router()

const API_VILLE = "https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=fc6e5f85-7eba-451c-8243-bdf35c2ab336"


router.get('/', async(req, res) => {
    try {
        const reponse = await axios.get(API_VILLE)
        const enregistrements = reponse.data.result.records
        const alertes = enregistrements.map(mapDonneApi)
        res.json({ data: alertes })
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur', message: err.message })
    }
})

module.exports = router