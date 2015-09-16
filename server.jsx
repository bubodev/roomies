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
import mongoose                                   from 'mongoose';
import { MONGO_URI }                              from './server/secrets';

const app = express();

import fs from 'fs';
/** UNCOMMENT FOR DIST BUILD **/
// app.use('/bundle.js', function (req, res) {
//   return fs.createReadStream('./dist/bundle.js').pipe(res);
// });

var MongoStore = require('connect-mongo')(session);
app.use(cookieParser());
app.use(session({ secret:'keyboard cat',
                  cookie: {
                    maxAge: new Date(Date.now() + 3600000),
                  },
                  store: new MongoStore({
                    url: MONGO_URI
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
    let result = next(action);
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
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
          <script type="application/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
          <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-67725615-1', 'auto');
            ga('send', 'pageview');
          </script>
        </body>
      </html>
    `
    res.end(HTML);
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
