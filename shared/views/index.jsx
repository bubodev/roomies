import React from 'react';
import Navbar from '../components/Navbar';
import Login from './Login';

let indexStyle = {
}

export default class AppView extends React.Component {
  render() {
    return(
      <div id="app-view" style={indexStyle}>
        <Navbar />
        {this.props.children || <Login />}
      </div>
    );
  }
}
