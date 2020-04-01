const chalk = require('chalk')
const ValidationError = require('../errors/validation-errors')
const AuthenticationError = require('../errors/authentication-errors')
const AccessDeniedError = require('../errors/access-denied-errors')

function errorLogger(err, req, res, next) {
  if (err.message){
    console.log(chalk.red(err.message))
  }
  if (err.stack){
    console.log(chalk.red(err.stack))
  }
  next(err)
}

function authenticationErrorHandler(err, req, res, next) {
  if (err instanceof AuthenticationError){
    return res.sendStatus(401)
  }
  next(err)
}

function validationErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.sendStatus(400)
  }
  next(err)
}

function accessDeniedErrorHandler(err, req, res, next) {
  if (err instanceof AccessDeniedError){
    return res.sendStatus(403)
  }
  next(err)
}

function genericErrorHandler(err, req, res, next) {
  res.sendStatus(500)
  next()
}

module.exports = function ErrorHandlingMiddleware(app) {
  app.use([
    errorLogger,
    authenticationErrorHandler,
    validationErrorHandler,
    accessDeniedErrorHandler,
    genericErrorHandler
  ])
}
