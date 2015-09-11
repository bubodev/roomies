import React from 'react';
import { Route } from 'react-router';
import App from 'views';
import Login from './views/Login';
import Home from './views/Home';
import About from './views/About';
import Chores from './views/Chores';
import Finances from './views/Finances';
import NewTaskForm from './components/NewTaskForm'

export default (
  <Route name="app" component={App} path="/">
    <Route path="login" component={Login} />
    <Route path="home" component={Home} onEnter={checkAuth}>
      <Route path="about" component={About} />
      <Route path="chores" component={Chores} />
      <Route path="finances" component={Finances} />
    </Route>
  </Route>
)

function checkAuth(nextState, transition) {

}