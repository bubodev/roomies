import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import SideBarItem from './SideBarItem';

@Radium
export default class SideBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sideBarShow: 'sideBarHide'
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
    return (
      <div style={[styles.base, styles[this.state.sideBarShow], styles[this.props.status]]} key="sideBar">
        <ul className="list-group text-center">
          <div style={styles.thumbnail} >
            <img style={styles.image} src="http://res.cloudinary.com/bitebox/image/upload/c_scale,w_150/v1434495985/default-avatar_oxtmnu.png" />
            <div className="caption">
              <h4> Example User </h4>
            </div>
          </div>
          <br />
          <SideBarItem label="Dashboard" route="/home/dashboard" faGlyph="tachometer" currentRoute={currentRoute}>
            <span className="badge alert-danger">4</span>
          </SideBarItem>
          <SideBarItem label="Chores" route="/home/chores" faGlyph="tasks" currentRoute={currentRoute} />
          <SideBarItem label="Finances" route="/home/finances" faGlyph="money" currentRoute={currentRoute} />
          <SideBarItem label="Shopping List" route="/home/shopping" faGlyph="cart-arrow-down" currentRoute={currentRoute} />
        </ul>
        <ul className="list-group text-center">
          <SideBarItem label="Settings" route="/home/settings" faGlyph="cog" currentRoute={currentRoute} />
          <a href="/logout" style={styles.linkItem}> 
            <li className="list-group-item" key="signout" style={styles.logOutButton}>
              <span className="fa fa-lg fa-sign-out" /> Logout
            </li> 
          </a>
        </ul>
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
      position: 'fixed',
      padding: '10px',
      width: '100%',
      zIndex: 1,
      background: 'white',
      transition: 'top .5s ease',
      borderBottom: '1px solid lightgrey',
      overflowY: 'scroll',
    }
  },

  sideBarHide: {
    '@media (max-width: 767px)': {
      top: '-800px'
    }
  },

  sideBarShow: {
    top: '51px'
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
    paddingTop: '60px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '200px',
  },

  image: {
    width: '90%',
  }
}