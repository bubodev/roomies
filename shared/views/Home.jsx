import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/AuthActions';
import SideBar from '../components/SideBar';  
import LoadingScreen from '../components/LoadingScreen';  

import Dashboard from './Dashboard';
import Footer from '../components/Footer';
import cookie from 'react-cookie';

class Home extends Component {

  constructor(props,context) {
    super(props,context);
  }

  componentDidMount() {
    let userId = cookie.load('userId')
    if(userId){
      this.props.loadUser(userId.slice(3,-1))
    } else {
      this.context.router.transitionTo('/login');
    }
  }

  render() {
    let sideBarShow;
    if(this.props.auth.loading) {
      sideBarShow = <LoadingScreen />
    } else if(this.props.auth.loaded) {
      if(this.props.auth.user.homeId){
        sideBarShow = <SideBar hasHome={true}/>
      } else {
        sideBarShow = <SideBar hasHome={false}/>
      }
    } else {
      sideBarShow = "";
    }

    return(
      <div className="container-fluid" style={styles.base}>
        <div className="col-sm-3 col-lg-2">
          { sideBarShow }
        </div>
        <div className="col-sm-9 col-lg-10">
          {this.props.children || <Dashboard />}
        </div>
        <Footer />
      </div>
    )
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
}

var styles = {
  base: {
    paddingTop: '5vh',
  },

  mainSection: {
  },
}

@connect(state => ({
  auth: state.auth,
  tasks: state.tasks,
}))

export default 
class HomeContainer {
  static propTypes = {
    auth: PropTypes.object,
    tasks: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { auth, children, dispatch } = this.props;
    return <Home auth={auth} children={children} {...bindActionCreators(authActions, dispatch)} />;
  }
}

