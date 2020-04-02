const express = require('express')

const Middleware = require('../middleware/middleware')
const ErrorHandlingMiddleware = require('../middleware/error-handling')

const SubscriptionsController = require('./controllers/subscriptions-controller')

const PORT = process.env.PORT

const app = express()

Middleware(app)

app.use('', SubscriptionsController)

ErrorHandlingMiddleware(app)

app.listen(PORT, ()=>console.log(`Subscription service listening on port ${PORT}`))
