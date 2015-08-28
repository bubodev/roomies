import React from 'react';
import Navbar from '../components/Navbar';
import Login from './Login';

export default class AppView extends React.Component {
  render() {
    return(
      <div id="app-view">
        <Navbar />
        {this.props.children || <Login />}
      </div>
    );
  }
}
