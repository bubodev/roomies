import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from '../actions/HomeActions';
import * as taskActions from '../actions/TaskActions';

import Overview from '../components/Overview';
import FindNewHome from '../components/FindNewHome';
import LoadingScreen from '../components/LoadingScreen';

import { layout } from './styles';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "LOADING"
    }
  }

  componentDidMount() {
    if(this.props.auth && this.props.auth.user) {
      this.props.auth.user.homeId && this.props.getHome(this.props.auth.user.homeId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.loading){
      this.setState({
        show: "TESTING"
      })
    } else if(nextProps.auth.user) {
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
  
  render() {
    let show;
    if(this.props.auth.loading){
      show = "LOADING"
    } else if(this.props.auth.user) {
      if(this.props.auth.user.homeId){
          show = "OVERVIEW"
      } else {
          show = "NEW"
      }
    }

    let comp;

    if(show === "OVERVIEW") {
      comp = <Overview auth={this.props.auth} home={this.props.home} _completeTask={this.props.completeTask}/>
    } else if(show === "NEW") {
      comp = <FindNewHome />
    } else if(show === "LOADING") {
      comp = (
        <div style={styles.loadingScreen}>
          <LoadingScreen>
            <h2>Taking long? You probably shouldnt be here</h2>
            <a href="/login">Try logging in here</a>
          </LoadingScreen>
        </div>
      )
    }

    return(
      <div style={layout.base}>
        <div className="title">
          Dashboard 
        </div>
        <div className="mainContent">
          { comp }
        </div>
      </div>
    )
  }
}

const styles = {
  loadingScreen: {
    position: 'fixed',
    width: '100vw',
    left: 0,
    top: '30vh',
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
    return <Dashboard auth={auth} home={home} {...bindActionCreators(homeActions, dispatch)} {...bindActionCreators(taskActions, dispatch)}/>;
  }
}