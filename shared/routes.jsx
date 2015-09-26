import React from 'react';
import { Route, Redirect } from 'react-router';
import App from 'views';
import Login from './views/Login';
import Home from './views/Home';
import About from './views/About';
import Chores from './views/Chores';
import Chat from './views/Chat';
import Finances from './views/Finances';
import Dashboard from './views/Dashboard';
import Settings from './views/Settings';
import ShoppingList from './views/ShoppingList';

export default (
  <Route path="/" name="app" component={App}>
    <Route path="login" component={Login} />
    <Route path="about" component={About} />
    <Route path="home" component={Home} onEnter={checkAuth}>
      <Route path="dashboard" component={Dashboard} />
      <Route path="chores" component={Chores} />
      <Route path="chat" component={Chat} />
      <Route path="finances" component={Finances} />
      <Route path="settings" component={Settings} />
      <Route path="shopping" component={ShoppingList} />
    </Route>
  </Route>
)

function checkAuth(nextState, transition) {

}