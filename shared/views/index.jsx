import React from 'react';
import Navbar from '../components/Navbar';
import Home from './Home';

export default class AppView extends React.Component {
  render() {
    return(
      <div id="app-view">
        <Navbar />
        <h1>Chore split (Top level Component)</h1>
        <hr />
        {this.props.children || <Home />}
      </div>
    );
  }
}
