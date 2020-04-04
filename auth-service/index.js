const express = require('express')

const ErrorHandlingMiddleware = require('../middleware/error-handling')
const Middleware = require('../middleware/middleware')
const UsersController = require('./controllers/users-controller')

const PORT = process.env.PORT

const app = express()

Middleware(app)

app.use('', UsersController)

ErrorHandlingMiddleware(app)

app.listen(PORT, () => console.log(`Auth service listening on port ${PORT}`))
