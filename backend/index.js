require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./db/connexion')

const avisRoutes = require('./routes/avis')
const subscriptionRoutes = require('./routes/subscriptions')
const notificationsRoutes = require('./routes/notifications')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

connectDB()

app.use('/avis-alertes', avisRoutes)
app.use('/', subscriptionRoutes)
app.use('/', notificationsRoutes)

app.listen(PORT, () => {
   console.log(`Serveur démarré sur http://localhost:${PORT}`)
})