import React, { PropTypes } from 'react';
import Radium from 'radium';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../actions/AuthActions';

@Radium
class SignInButton extends React.Component {
  handleClick() {
    this.props.login();
    console.log(this.props.auth.user);
  }

  render() {
    return (
      <div>
        <div onClick={::this.handleClick} style={styles.customBtn}>
          <span style={styles.span.icon}></span>
          <span style={styles.span.buttonText}>Google</span>
        </div>
      </div>
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

@connect(state => ({
  auth: state.auth,
}))

export default 
class SearchFormContainer {
  static propTypes = {
    auth: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { auth, dispatch } = this.props;
    return <SignInButton auth={auth} {...bindActionCreators(authActions, dispatch)} />;
  }
}

