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
      <div>
        <div key="howItWorks" style={styles.howItWorks}>
          <div className="">
            <div className="row">
              <span 
                key="closeButton" 
                style={styles.closeButton} 
                className="glyphicon glyphicon-remove btn" 
                onClick={::this.handleClick} />
            </div>
            <div className="row">
              <div className="col-md-4 text-center">
                <h3>Split tasks</h3>
              </div>
              <div className="col-md-4 text-center">
                <h3>Bills</h3>
              </div>
              <div className="col-md-4 text-center">
                <h3>Share</h3>
              </div>
            </div>
          </div>
        </div>
        <div style={[styles.base, styles[this.state.workShow]]} key="base" className="container text-center">
          <div className="row">
            <div className="col-sm-6" key="catchPhrase" style={styles.catchPhrase}>
              <h1>be better <span style={{color:accentColor}}>roomies</span></h1>
              <button onClick={::this.handleClick} style={styles.button}> how it works </button>
            </div>
            <div className="col-sm-6" key="loginButton" style={styles.loginButton}>
              <span style={styles.loginLabel}>Sign in with: </span>
              <br />
              <GoogleSignInButton />
            </div>
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
    backgroundImage: 'url("http://res.cloudinary.com/bitebox/image/upload/c_scale,w_1200/v1442472575/ceystalhorizon_qwjsx3.png")',
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    height: '100vh',
    width: '100vw',
    color: 'white',
    left: '0',
    position: 'relative',
    transition: 'left .5s ease',
    '@media (max-width: 1000px)': {
      top: '0',
      transition: 'top .5s ease'
    }
  },

  howItWorks: {
    color: 'white',
    backgroundColor: accentColor,
    paddingTop: '51px',
    position: 'fixed',
    width: '70vw',
    height: '100vh',
    '@media (max-width: 1000px)': {
      width:'100vw',
      height: '70vh',
    }
  },

  workShow: {
    left: '70vw',
    '@media (max-width: 1000px)': {
      left: '0',
      top: '70vh'
    }
  },

  closeButton: {
    color: 'white',
    fontSize: 'larger',
    float: 'right',
    position: 'relative',
    right: '2vw'
  },

  catchPhrase: {
    paddingTop: '30vh',
  },

  loginButton: {
    paddingTop: '30vh',
    '@media (max-width: 768px)': {
      paddingTop: '15vh'
    }
  },

  loginLabel: {
    fontSize: '16px'
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