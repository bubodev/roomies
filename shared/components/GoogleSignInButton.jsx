import React from 'react';
import Radium from 'radium';

@Radium
export default class extends React.Component {
  render() {
    return (
      <div className="pull-right" style={styles.googleButton}>
        <span style={styles.span.label}>Sign in with:</span>
        <a href="/auth/google">
          <div style={styles.customBtn}>
            <span style={styles.span.icon}></span>
            <span style={styles.span.buttonText}>Google</span>
          </div>
        </a>
      </div>
    );
  }
}

var styles = {
  googleButton: {
    bottom: '50%',
    position: 'absolute',
    right: '50px'
  },

  customBtn: {
    display: 'inline-block',
    background: '#4285f4',
    color: 'white',
    width: '190px',
    borderRadius: '5px',
    whiteSpace: 'nowrap',
    ':hover' : {
      cursor: 'pointer'
    }
  },

  span: {
    label: {
      fontWeight: 'bold',
    },
    icon: {
      background: 'url("https://google-developers.appspot.com/identity/sign-in/g-normal.png") transparent 5px 50% no-repeat',
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '42px',
      height: '40px',
      borderRight: '#2265d4 1px dashed'
    },
    buttonText: {
      display: 'inline-block',
      verticalAlign: 'middle',
      paddingLeft: '42px',
      paddingRight: '42px',
      fontSize: '16px',
      fontWeight: 'bold',
    }
  }
}