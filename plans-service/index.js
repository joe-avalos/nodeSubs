const express = require('express')

const Middleware = require('../middleware/middleware')
const ErrorHandlingMiddleware = require('../middleware/error-handling')
const AuthMiddleware = require('../middleware/auth')

const PlansController = require('./controllers/plans-controller')

const PORT = process.env.PORT

const app = express()

Middleware(app)
AuthMiddleware(app)

app.use('', PlansController)

ErrorHandlingMiddleware(app)

app.listen(PORT, ()=>console.log(`Plans service listening on port ${PORT}`))
