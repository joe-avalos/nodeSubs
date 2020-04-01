const ValidationError = require('./validation-errors')
const AuthenticationError = require('./authentication-errors')
const AccessDeniedError = require('./access-denied-errors')

module.exports = {
  ValidationError,
  AuthenticationError,
  AccessDeniedError,
}
