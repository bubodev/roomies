import React from 'react';
import { Route } from 'react-router';

import App from 'views';
import Login from './views/Login';
import Home from './views/Home';
import About from './views/About';

export default (
  <Route name="app" component={App} path="/">
    <Route path="login" component={Login} />
    <Route path="home" component={Home} />
    <Route path="about" component={About} onEnter={requireAuth} />
  </Route>
)

function requireAuth(nextState, transition) {
  debugger;
}