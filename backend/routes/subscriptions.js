const express = require('express')
const webpush = require('web-push')
const Subscription = require('../db/subscription')


const router = express.Router()

// Identifiant pour la notif
webpush.setVapidDetails(
    process.env.VAPID_EMAIL,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
)

router.get('/vapid-public-key', (req, res) => {
    res.json({ data: process.env.VAPID_PUBLIC_KEY })
})

router.post('/subscribe', async(req, res) => {
    const { subscription } = req.body

    if(!subscription || !subscription.keys) {
        return res.status(400).json({
            error: 'Données manquantes',
            message: 'Abonnement incomplet'
        })
    }

    try {
        const dejaAbonne = await Subscription.findOne({ endpoint: subscription.endpoint })

        if (dejaAbonne) {
            return res.status(200).json({ data: 'Navigateur déja abonné' })
        }

        const nouvelAbonnement = new Subscription({
            endpoint: subscription.endpoint,
            keys: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth
            }
        })

        await nouvelAbonnement.save()
        res.status(201).json({ data: 'Abonnement sauvegardé avec succès' })
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur', message: err.message })
    }
})

router.post('/unsubscribe', async (req, res) => {
    const { endpoint }  = req.body

    if(!endpoint) {
        return res.status(400).json({
            error: 'Données manquantes',
            message: 'Endpoint est requis'
        })
    }

    try {
        const abonnement = await Subscription.findOneAndDelete({ endpoint })

        if(!abonnement) {
            return res.status(404).json({
            error: 'Introuvable',
            message: 'Aucun abonnement trouvé pour cet endpoint'
            })
        }

        res.status(200).json({ data: 'Désabonnement réussi' })
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur', message: err.message })
    }
})

module.exports = router