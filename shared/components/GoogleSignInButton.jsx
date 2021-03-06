import React, { PropTypes } from 'react';
import Radium from 'radium';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../actions/AuthActions';

@Radium
class SignInButton extends React.Component {
  handleClick() {
    this.props.login();
  }

  render() {
    return (
      <a href='/auth/google'>
        <div>
        <div style={styles.customBtn}>
          <span style={styles.span.icon}></span>
          <span style={styles.span.buttonText}>Google</span>
        </div>
        </div>
      </a>
    );
  }
}

var styles = {
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

@connect(state => ({}))

export default 
class SearchFormContainer {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { dispatch } = this.props;
    return <SignInButton {...bindActionCreators(authActions, dispatch)} />;
  }
}

