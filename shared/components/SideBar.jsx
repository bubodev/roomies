import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import SideBarItem from './SideBarItem';

import { connect } from 'react-redux';
import { outline, colors } from './styles'
if (process.env.BROWSER) {
  require("./SideBar.css");
}
import { Spring } from 'react-motion';

@Radium
class SideBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sideBarShow: 'sideBarHide',
    }
  }

  toggleSideBar() {
    let toggled;
    if(this.state.sideBarShow === 'sideBarHide') {
      toggled = 'sideBarShow'
    } else {
      toggled = 'sideBarHide'
    }
    
    this.setState({
      sideBarShow: toggled
    })
  }

  render () {
    let currentRoute = this.context.router.state.location.pathname;
    
    let sideBarItems;
    let settingsButton;

    if(this.props.hasHome) {
      sideBarItems = (
        <div>
          <SideBarItem closeSideBar={::this.toggleSideBar} label="Dashboard" route="/home/dashboard" faGlyph="tachometer" currentRoute={currentRoute} />
          <SideBarItem closeSideBar={::this.toggleSideBar} label="Chores" route="/home/chores" faGlyph="tasks" currentRoute={currentRoute} />
          <SideBarItem closeSideBar={::this.toggleSideBar} label="Finances" route="/home/finances" faGlyph="money" currentRoute={currentRoute} />
          <SideBarItem closeSideBar={::this.toggleSideBar} label="Shopping List" route="/home/shopping" faGlyph="cart-arrow-down" currentRoute={currentRoute} />
        </div>
      )
      settingsButton = <SideBarItem closeSideBar={::this.toggleSideBar} label="Settings" route="/home/settings" faGlyph="cog" currentRoute={currentRoute} />
    }

    let loading;
    let { authLoading, homeLoading, taskLoading } = this.props;
    
    if(authLoading || homeLoading) {
      loading = <span className="fa fa-3x fa-spin fa-spinner"/>
    }

    return (
      <Spring defaultValue={{left: {val: -400}}} endValue={{left: {val: 0}}}>
        {t => {
          let tween = {
            left: t.left.val
          }

          return(
            <div >
              <div style={tween} className={"base " + this.state.sideBarShow + " " + this.props.status}>
                <ul className="list-group text-center">
                  <div className="profile-pic" style={outline} >
                    <span className="fa fa-5x icon-border fa-user" />
                    <div className="caption">
                      <h4> {this.props.user.name} </h4>
                    </div>
                  </div>
                  <br />
                  { sideBarItems }
                </ul>
                <ul className="list-group text-center">
                  { settingsButton }
                  <a href="/logout"> 
                    <li className="list-group-item logOutButton">
                      <span className="fa fa-lg fa-sign-out" /> Logout
                    </li> 
                  </a>
                </ul>
                <div style={styles.statusContainer}>
                  { loading }
                </div>
              </div>
              <button className="btn btn-default sideBarToggle" onClick={::this.toggleSideBar} >
                <span className="fa fa-bars" /> 
              </button>
            </div>

          )
        }}
      </Spring>
    )
  }
}

SideBar.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

@connect(state => ({
  user: state.auth.user,
  authLoading: state.auth.loading,
  homeLoading: state.home.loading,
  taskLoading: state.tasks.loading
}))

export default
class SideBarContainer {
  static propTypes = {
    user: PropTypes.object,
    hasHome: PropTypes.bool,
    authLoading: PropTypes.bool,
    homeLoading: PropTypes.bool,
  }

  render() {
    const { user, hasHome, authLoading, homeLoading, taskLoading } = this.props;
    return <SideBar authLoading={authLoading} homeLoading={homeLoading} user={user} hasHome={hasHome} />
  }
}

const styles = {
  disabled: {
    display: 'none'
  },

  image: {
    width: '90%',
  },

  statusContainer: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    bottom: 20,
    position: 'absolute',
  }
}