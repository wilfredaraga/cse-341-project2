const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(session({
  secret:'secret',
  resave: false,
  saveUninitialized: true,
}))
// This is the basic express session({..}) initialization.
app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session())
// allow passport to use "express-session".
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({origin: '*'}));
app.use('/', require('./routes'));


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ githubId: profile.id }, function (err,user) {
    return done(null, profile);
  //})
}
));

passport.serializeUser((user, done) => {
  return done(null, user);
});
passport.deserializeUser((user, done) => {
  return done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: 'Logged out')});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect : '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => { console.log(`Database is listening and node Running on port ${port}`) })
    }
})

// production error handler
// no stacktraces leaked to user
app.use(function (error, req, res, next) {
    if (res.headersSent) {
      return next(error)
    } else {
      res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({
        error
      });
    }
  
  });