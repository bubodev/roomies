import React, { Component } from 'react';
import Radium from 'radium';

import GoogleSignInButton from '../components/GoogleSignInButton';

@Radium
export default class Login extends Component {
  render() {
    return(
      <div style={styles.base} className="container text-center">
        <div style={styles.catchPhrase}>
          <h1>be better <span style={{color:'#00DFFF'}}>roomies</span></h1>
          <button style={styles.button}> how it works </button>
        </div>
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
  },

  catchPhrase: {
    float: 'left',
    position: 'absolute',
    marginTop: '30vh',
    marginLeft: '10vw',
    color: 'white',
  },

  button: {
    padding: '10px',
    backgroundColor: 'rgba(0,0,0,0)',
    border: '2px solid white',
    fontWeight: 'bold',
  }
}