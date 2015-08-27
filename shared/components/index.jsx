import React from 'react';
import Login from './login';

export default class AppView extends React.Component {
  render() {
    return(
      <div id="app-view">
        <h1>Chore split (Top level Component)</h1>
        LOGIN HERE
        <hr />
        <Login />
        {this.props.children}
      </div>
    );
  }
}