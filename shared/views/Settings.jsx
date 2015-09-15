import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/AuthActions';
import * as HomeActions from '../actions/HomeActions';

import UserInfoForm from '../components/UserInfoForm';

@Radium
class Settings extends Component {
  render() {
    return(
      <div style={styles.base}>
        <h1> Settings </h1>
        <UserInfoForm />
      </div>
    )
  }
}

const styles = {
  base: {
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