const express = require('express')

const PlansController = require('./controllers/plans-controller')
const SubscriptionsController = require('./controllers/subscriptions-controller')

const PORT = process.env.PORT = 3000

const app = express()

app.use('/api/plans', PlansController)
app.use('/api/subscriptions', SubscriptionsController)

app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`))
