import React, { Component } from 'react';
import Radium from 'radium';

import GoogleSignInButton from '../components/GoogleSignInButton';

@Radium
export default class Login extends Component {
  render() {
    return(
      <div style={styles.base} className="container text-center">
        <GoogleSignInButton />
      </div>
    )
  }
}

var styles = {
  base: {
    paddingTop: '51px',
    backgroundImage: 'url("http://onwardstate.com/wp-content/uploads/2012/04/2008_step_brothers_0091.jpeg")',
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    height: '100vh',
    width: '100vw',
    color: 'white'
  }
}