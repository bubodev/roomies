import express                          from 'express';
import session                          from 'express-session';
import React                            from 'react';
import { Router }                       from 'react-router';
import Location                         from 'react-router/lib/Location';
import routes                           from 'routes';
import { applyMiddleware }              from 'redux';
import promiseMiddleware                from 'lib/promiseMiddleware'
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import passport                         from 'passport';
import GoogleStrategy                   from 'passport-google-oauth';
import * as reducers                    from 'reducers';
import mongoose                         from 'mongoose';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './secrets'

mongoose.connect('mongodb://localhost/test'); 

const User = mongoose.model('User', { 
  googleId: String,
  name: String,
  token: String,
});

const app = express();

passport.serializeUser( (user, done) => {
  done(null, user);
})

passport.deserializeUser( (obj, done) => {
  done(null, obj);
})

passport.use(new GoogleStrategy.OAuth2Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var user;

    User.findOne({ googleId: profile.id }, function(err, foundUser) {
      user = foundUser;

      if(!user) {
        console.log("creating new user...");
        user = new User({ 
          googleId: profile.id,
          name: profile.displayName,
          token: accessToken
        });

        user.save((err) => {
          if(err)
            console.log(err)
          console.log("succesfully created new user");
        })
      } else {
        console.log("user found!");
      }

      return done(null, user)
    });
  }
));

app.use(session({ 
  secret: 'keyboard cat' 
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/test', ensureAuthenticated, function(req, res) {
  console.log(req.user);
  res.redirect('/');
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  function(req, res){
  });

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/login', function(req, res){
  const HTML=`
    <a href="/auth/google"> Click here to login with google </a>
    `;
  res.end(HTML);
})

app.use(ensureAuthenticated, (req, res) => {
  const location = new Location(req.path, req.query);
  const reducer = combineReducers(reducers);
  const store = createStore(reducer);

  Router.run(routes, location, (err, routeState) => {
    if (err) return console.error(err);
    if (!routeState) return res.status(404).end('404');

    const InitialComponent = (
      <Provider store={store}>
        {() =>
          <Router {...routeState} />
        }
      </Provider>
    );
    const componentHTML = React.renderToString(InitialComponent);
    const initialState = store.getState();
    const HTML = `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Chore Split App</title>
          <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"/>
          <script type="application/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
    `
    res.end(HTML);
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

export default app;
