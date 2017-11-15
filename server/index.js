// NOTE server side of the app will use common JS modules
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('bodyParser');
const keys = require('./config/keys');
require('./models/User');
// NOTE dont need const since this file only needs to be executed; not referenced anywhere in this file
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // express will serve up production assets (e.g. main.js, main.css)
  app.use(express.static('client/build'));

  // express will serve up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// app.get('/', (req, res) => {
//   res.send({ hi: 'there' });
// });

// express can inject environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT);
