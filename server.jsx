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
    let user = new User({ 
      googleId: profile.id,
      name: profile.displayName,
      token: 
    });

    user.save()

    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

app.use(session({ 
  secret: 'keyboard cat' 
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  function(req, res){
  });

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.use((req, res) => {
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
            window.__TEST__ = "TEST";
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
