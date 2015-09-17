import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/AuthActions';
import * as HomeActions from '../actions/HomeActions';

import UserInfoForm from '../components/UserInfoForm';

import { layout } from './styles'
@Radium
class Settings extends Component {
  render() {
    return(
      <div style={layout.base}>
        <div style={layout.title}>
          Settings
        </div> 
        <div key='settings' style={layout.mainContent}>
          <UserInfoForm />
        </div>
      </div>
    )
  }
}

@connect( state => ({
  auth: state.auth,
  home: state.home
}))

export default
class SettingsContainer {
  static propTypes = {
    auth: PropTypes.object,
    home: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    const { auth, home, dispatch } = this.props;
    return (
      <Settings 
        auth={auth} {...bindActionCreators(AuthActions, dispatch)}
        home={home} {...bindActionCreators(HomeActions, dispatch)} />
    )
  }
}