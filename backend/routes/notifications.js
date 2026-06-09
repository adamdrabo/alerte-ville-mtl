const express = require('express')
const webpush = require('web-push')
const Subscription = require('../db/subscription')

const router = express.Router()

router.post('/send-notification', async (req, res) => {
    const { title, body, url } = req.body

    if (!title || !body) {
        return res.status(400).json({
        error: 'Données manquantes',
        message: 'Le titre et le corps sont requis'
        })
    }

    try {
        const abonnements = await Subscription.find()

        if (abonnements.length == 0) {
            return res.status(200).json({
                data: 'Aucun abonné trouvé'
            })
        }

        const payload = JSON.stringify({
            title,
            body,
            url: url || '/'
        })

        let succes = 0
        let echecs = 0

        for (const abonnement of abonnements) {
            try {
                await webpush.sendNotification(
                    {
                        endpoint: abonnement.endpoint,
                        keys: {
                            p256dh: abonnement.keys.p256dh,
                            auth: abonnement.keys.auth
                        }
                    },
                    payload
                )
                succes++
            } catch (err) {
                if (err.statusCode === 410 || err.statusCode === 404) {
                    await Subscription.findOneAndDelete({ endpoint: abonnement.endpoint })
                }
                echecs++
            }
        }
        res.status(200).json({
            data: {
                total: abonnements.length,
                succes,
                echecs
            }
        })
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur', message: err.message })
    }
})

module.exports = router


