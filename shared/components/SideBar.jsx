import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import SideBarItem from './SideBarItem';

import { connect } from 'react-redux';

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

    return (
      <div>
        <div style={[styles.base, styles[this.state.sideBarShow], styles[this.props.status]]} key="sideBar">
          <ul className="list-group text-center">
            <div style={styles.thumbnail} >
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
            <a href="/logout" style={styles.linkItem}> 
              <li className="list-group-item" key="signout" style={styles.logOutButton}>
                <span className="fa fa-lg fa-sign-out" /> Logout
              </li> 
            </a>
          </ul>
        </div>
        <button className="btn btn-default" style={styles.sideBarToggle} key="sideBarToggle" onClick={::this.toggleSideBar} >
          <span className="fa fa-bars" />  
        </button>
      </div>
    )
  }
}

SideBar.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

@connect(state => ({
  user: state.auth.user,
}))

export default
class SideBarContainer {
  static propTypes = {
    user: PropTypes.object,
    hasHome: PropTypes.bool
  }

  render() {
    const { user, hasHome } = this.props;
    return <SideBar user={user} hasHome={hasHome} />
  }
}

const styles = {
  base: {
    background: '#40474E',
    position: 'fixed',
    left: 0,
    top: 0,
    width: '25%',
    height: '100vh',
    overflowY: 'scroll',
    '@media (max-width: 767px)': {
      padding: '10px',
      width: '100%',
      zIndex: 1,
      transition: 'top .5s ease',
    },
    '@media (min-width: 1200px)': {
      width: '16.66667%',
    },
  },

  sideBarHide: {
    '@media (max-width: 767px)': {
      top: '-100vh'
    }
  },

  sideBarShow: {
    top: '0px'
  },

  sideBarToggle: {
    display: 'none',
    '@media (max-width: 767px)': {
      position: 'fixed',
      display: 'block',
      top: '30px',
      right: 0,
      marginRight: '20px',
      marginTop: '35px',
      zIndex: 11,
      ':hover': {
        cursor: 'pointer',
      }
    }
  },

  logOutButton: {
    width: '90%',
    margin: 'auto',
    position: 'relative',
    bottom: '-20px',
    background: 'lightcoral',
    color: 'white',
    border: 'none',
    ':hover': {
      background: 'rgb(234, 89, 89)'
    }
  },

  linkItem: {
    textDecoration: 'none',
    color: 'darkgrey',
    ':hover': {
      color: 'black',
    }
  },

  disabled: {
    display: 'none'
  },

  thumbnail: {
    color: 'white',
    width: 'auto',
    marginTop: '80px',
    padding:'20px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '200px',
    border: '2px dotted white',
    borderRadius: '3px'
  },

  image: {
    width: '90%',
  }
}