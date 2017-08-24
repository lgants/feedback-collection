const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  // route handles oauth response from google and contains code
  app.get('/auth/google/callback', passport.authenticate('google'));
}
