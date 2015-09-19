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
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.home.home) {
      this.props.loadUser(this.props.auth.user._id);
      this.context.router.transitionTo('/home/');
    }
  }

  deleteUser() {
    this.props.deleteUser()
  }

  removeUser() {
    let homeId = this.props.auth.user.homeId;
    let userId = this.props.auth.user._id;
    this.props.removeUserFromHome(homeId, userId);
  }

  debug() {
    debugger;
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

    return(
      <div style={layout.base}>
        <div style={layout.title}>
          Settings
        </div> 
        <div key='settings' style={layout.mainContent}>
        <button onClick={::this.debug} />
          {err} 
          <UserInfoForm removeUser={::this.removeUser} deleteUser={::this.deleteUser}/>
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