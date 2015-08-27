import express                          from 'express';
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

const app = express();
const GOOGLE_CLIENT_ID = "383967035892-o6a59blu65vkoona58ui7f8ekaltio4c.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "6NMV0DQn6n2qxpm5M81mUqiN";

passport.serializeUser( (user, done) => {
  done(null, user);
})

passport.deserializeUser( (obj, done) => {
  done(null, obj);
}

passport.use(new GoogleStrategy.OAuth2Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

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

export default app;
