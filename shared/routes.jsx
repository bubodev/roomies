import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'views';
import Login from './views/Login';
import Home from './views/Home';
import About from './views/About';
import Chores from './views/Chores';
import Finances from './views/Finances';
import Dashboard from './views/Dashboard';


export default (
  <Route name="app" component={App} path="/">
    <Route path="login" component={Login} />
    <Route path="about" component={About} />
    <Route path="home" component={Home} onEnter={checkAuth}>
      <Route path="dashboard" component={Dashboard} />
      <Route path="chores" component={Chores} />
      <Route path="finances" component={Finances} />
    </Route>
  </Route>
)

function checkAuth(nextState, transition) {

}