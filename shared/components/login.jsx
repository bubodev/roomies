import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isAuthLoaded} from '../reducers/AuthReducer';
import * as authActions from '../actions/AuthActions';
import {load as loadAuth} from '../actions/AuthActions';

class Login extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    login: React.PropTypes.func,
    logout: React.PropTypes.func
  }

  render() {
    return(
      <a href="/auth/google"> Click here to login with google </a>
    );
  }
}

@connect(state => ({
  user: state.auth.user
}))

export default class LoginContainer extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired
  }

  static fetchData(store) {
    if(!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }

  render() {
    const { user, dispatch } = this.props;
    return <Login user={user} {...bindActionCreators(authActions, dispatch)}>
      {this.props.children}
    </Login>
  }
}
