import React, { Component } from 'react';
import Radium from 'radium';
import GoogleSignInButton from '../components/GoogleSignInButton';

const accentColor = '#00DFFF';

@Radium
export default class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      workShow: ''
    }
  }

  handleClick(e) {
    e.preventDefault();
    let workShow = this.state.workShow;
    workShow = (workShow) === "workShow" ? '' : "workShow";
    this.setState({workShow: workShow});
  }

  render() {
    return(
      <div style={[styles.base, styles[this.state.workShow]]} className="container text-center">
        <div className="row">
          <div className="col-sm-6" style={styles.catchPhrase}>
            <h1>be better <span style={{color:accentColor}}>roomies</span></h1>
            <button onClick={::this.handleClick} style={styles.button}> how it works </button>
          </div>
          <div className="col-sm-6" style={styles.loginButton}>
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    )
  }
}

var styles = {
  base: {
    paddingTop: '51px',
    backgroundColor: 'grey',
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    height: '100vh',
    width: '100vw',
    color: 'white',
    left: '0',
    position: 'relative',
    transition: 'left .5s ease',
  },

  workShow: {
    left: '50%', 
  },

  catchPhrase: {
    paddingTop: '30vh'
  },

  loginButton: {
    paddingTop: '30vh'
  },

  button: {
    padding: '10px',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'rgba(255,255,255,0.8)',
    border: '2px solid rgba(255,255,255,0.8)',
    fontWeight: 'bold',
    transition: 'all .5s ease',
    ':hover': {
      color: 'white',
      border: '2px solid ' + accentColor
    }
  }
}