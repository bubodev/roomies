import React from 'react';
import Navbar from '../components/Navbar';
import Home from './Home';

export default class AppView extends React.Component {
  render() {
    return(
      <div id="app-view">
        <Navbar />
        {this.props.children || <Home />}
      </div>
    );
  }
}
