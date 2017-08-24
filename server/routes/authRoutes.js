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

  app.get('api/logout', (req, res) => {
    // logout() attached to req object by passport
    req.logout();
    res.send(req.user);
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
}
