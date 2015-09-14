import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/AuthActions';

import Overview from '../components/Overview';
import FindNewHome from '../components/FindNewHome';
import LoadingScreen from '../components/LoadingScreen';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "loading"
    }
  }

  debug() {
    debugger;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth){
      if(nextProps.auth.user) {
        if(nextProps.auth.user.homeId){
          this.setState({
            show: "OVERVIEW"
          })
        } else {
          this.setState({
            show: "NEW"
          })
        }
      }
    }
  }

  render() {
    let comp;

    if(this.state.show === "OVERVIEW") {
      comp = <Overview />
    } else if(this.state.show === "NEW") {
      comp = <FindNewHome />
    }

    return(
      <div>
        <button onClick={::this.debug} />
        <h1>Dashboard</h1>
        { comp }
      </div>
    )
  }
}

@connect(state => ({
  auth: state.auth,
  home: state.home
}))
export default class DashboardContainer {
  static propTypes = {
    auth: PropTypes.object,
    home: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { auth, home, dispatch } = this.props;
    return <Dashboard auth={auth} home={home} {...bindActionCreators(authActions, dispatch)} />;
  }
}