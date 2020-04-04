const passport = require('passport')

module.exports = function protectedRoute() {
  return passport.authenticate('jwt', {session: false})
}
