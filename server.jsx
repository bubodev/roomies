import express                                    from 'express';
import cookieParser                               from 'cookie-parser';
import session                                    from 'express-session';
import bodyParser                                 from 'body-parser';
import React                                      from 'react';
import { Router }                                 from 'react-router';
import Location                                   from 'react-router/lib/Location';
import routes                                     from 'routes';
import { applyMiddleware }                        from 'redux';
import { createStore, combineReducers }           from 'redux';
import { Provider }                               from 'react-redux';
import * as reducers                              from 'reducers';
import passport                                   from './server/passport';
import mongoose from 'mongoose';
const app = express();

import Login from './shared/views/Login';

var MongoStore = require('connect-mongo')(session);
app.use(cookieParser());
app.use(session({ secret:'keyboard cat',
                  cookie: {
                    maxAge: new Date(Date.now() + 3600000),
                  },
                  store: new MongoStore({
                    url: 'mongodb://localhost/test'
                  }),
                  resave: false,
                  saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

/** AUTH ROUTES **/

app.use(require('./server/auth'));

/** API ROUTES **/

app.use('/api', ensureAuthenticated, require('./server/api'));

/** REACT ROUTER **/

import promiseMiddleware from 'shared/lib/promiseMiddleware';

app.use((req, res) => {
  const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
  };


  const location = new Location(req.path, req.query);
  const reducer = combineReducers(reducers);
  let createStoreWithMiddleware = applyMiddleware(promiseMiddleware, logger)(createStore);
  const store = createStoreWithMiddleware(reducer);

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
    res.end(HTML, { test: 'hello' });
  });
});

function ensureAuthenticated(req, res, next) {
  // if (req.isAuthenticated() || req.session.username) { 
    next();
  // } else {
    // res.redirect('/login');
  // }
}

export default app;
