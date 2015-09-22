import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from '../actions/AuthActions';
import * as taskActions from '../actions/TaskActions';
import * as homeActions from '../actions/HomeActions';

import SideBar from '../components/SideBar';  
import LoadingScreen from '../components/LoadingScreen';  

import Dashboard from './Dashboard';
import Footer from '../components/Footer';
import cookie from 'react-cookie';

if (process.env.BROWSER) {
  require("./styles/main.css");
}

class Home extends Component {

  constructor(props,context) {
    super(props,context);
  }

  componentDidMount() {
    let userId = cookie.load('userId')
    let that = this;
    console.log(userId);
    if(userId){
      this.props.loadUser(userId.slice(3,-1))
        .then(function(status) {
          if(status.type === "GET_USER_SUCCESS"){
            let homeId = status.res.data.homeId;
            if(homeId){
              that.props.getHome(homeId)
              that.props.getTasks(homeId)
            }
          }
        })
    } else {
      this.context.router.transitionTo('/login');
      return;
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.deleted){
      this.context.router.transitionTo('/login');
      return;
    }
  }

  render() {
    let sideBarShow;
    if(this.props.auth.loading) {
      sideBarShow = null
    } else if(this.props.auth.loaded) {
      if(this.props.auth.user.homeId){
        sideBarShow = <SideBar hasHome={true} />
      } else {
        sideBarShow = <SideBar hasHome={false} />
      }
    } else {
      sideBarShow = null;
    } 

    return(
      <div style={baseStyle}>
        <div className="col-sm-3 col-lg-2">
          { sideBarShow }
        </div>
        <div className="col-sm-9 col-lg-10">
          {this.props.children}
        </div>
        <div style={footerStyle} className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2">
          <Footer />
        </div>
      </div>
    )
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const baseStyle = {
  marginRight: 'auto',
  marginLeft: 'auto',
  height: '100vh',
  background: 'url("http://res.cloudinary.com/bitebox/image/upload/c_scale,w_1200/v1442472575/ceystalhorizon_qwjsx3.png")',
  backgroundSize: 'cover',
}

const footerStyle = {
  position: 'fixed',
  bottom: 0
}

@connect(state => ({
  auth: state.auth,
  tasks: state.tasks,
  home: state.home,
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
    return <Home auth={auth} children={children} {...bindActionCreators(authActions, dispatch)} {...bindActionCreators(homeActions, dispatch)}{...bindActionCreators(taskActions, dispatch)}/>;
  }
}