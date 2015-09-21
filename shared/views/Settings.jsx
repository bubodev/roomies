import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/AuthActions';
import * as HomeActions from '../actions/HomeActions';

import UserInfoForm from '../components/UserInfoForm';

import { layout } from './styles'

class Settings extends Component {
  constructor(props, context) {
    super(props, context);
  }

  deleteUser() {
    this.props.deleteUser()
  }

  removeUser() {
    let homeId = this.props.auth.user.homeId;
    let userId = this.props.auth.user._id;
    let that = this;
    homeId && userId && 
      this.props.removeUserFromHome(homeId, userId)
        .then(function(status){
          if(status.type === "REMOVE_USER_SUCCESS")
            that.props.loadUser(userId);
        })
  }

  render() {
    let err;
    if(this.props.auth.err){
      err = (
        <div className="alert alert-danger">
          {this.props.auth.err.data}
        </div>
      )
    }

    let hasHome;
    if(this.props.auth && this.props.auth.user && this.props.auth.user.homeId) {
      hasHome = true;
    } else {
      hasHome = false;
    }

    return(
      <div style={layout.base}>
        <div className="title">
          Settings
        </div> 
        <div className="mainContent">
          {err} 
          <UserInfoForm hasHome={hasHome} removeUser={::this.removeUser} deleteUser={::this.deleteUser}/>
        </div>
      </div>
    )
  }
}

Settings.contextTypes = {
  router: React.PropTypes.object.isRequired
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