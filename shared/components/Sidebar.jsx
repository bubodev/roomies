import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

@Radium
export default class SideBar extends Component {
  constructor(props) {
    super(props);
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
    let style;
    return (
      <div style={[styles.sideBar, styles[this.state.sideBarShow]]} key="sideBar">
          <ul className="list-group text-center">
          <Link to="/home/dashboard" style={styles.linkItem}> 
            <li className="list-group-item" style={styles.sideBarItem}>
              <span className="fa fa-tachometer" /> Dashboard
            </li> 
          </Link>
          <Link to="/home/chores" style={styles.linkItem}> 
            <li className="list-group-item" style={styles.sideBarItem}>
              <span className="fa fa-tasks" /> Chores
            </li> 
          </Link>
          <Link to="/home/finances" style={styles.linkItem}> 
            <li className="list-group-item" style={styles.sideBarItem}>
              <span className="fa fa-money" /> Finances
            </li> 
          </Link>
          <Link to="/home/shopping" style={styles.linkItem}> 
            <li className="list-group-item" style={styles.sideBarItem}>
              <span className="fa fa-cart-arrow-down" /> Shopping List
            </li> 
          </Link>
          </ul>
          <ul className="list-group text-center">
            <Link to="/home/finances" style={styles.linkItem}> 
              <li className="list-group-item" style={styles.sideBarItem}>
                <span className="fa fa-cog" /> Settings
              </li> 
            </Link>
            <a href="/logout" style={styles.linkItem}> 
              <li className="list-group-item" style={styles.sideBarItem}>
                <span className="fa fa-sign-out" /> Logout
              </li> 
            </a>
          </ul>
        <span key="sideBarToggle" onClick={::this.toggleSideBar} className="fa fa-2x fa-bars" style={styles.sideBarToggle}/>  
      </div>
    )
  }
}

var styles = {
  sideBar: {
    '@media (max-width: 767px)': {
      position: 'fixed',
      left: 0,
      padding: '10px',
      width: '100%',
      zIndex: 1,
      background: 'gainsboro',
      transition: 'top .5s ease',
    }
  },

  sideBarHide: {
    top: '-400px'
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
      paddingRight: '10px',
      paddingTop: '10px',
      zIndex: 11,
      ':hover': {
        cursor: 'pointer',
        color: 'black'
      }
    }
  },

  linkItem: {
    textDecoration: 'none',
    color: 'darkgrey',
    ':hover': {
      color: 'black'
    }
  },

  sideBarItem: {
    width: '100%',
    padding: '25px',
    textAlign: 'center',
    background: 'none',
    border: 'none'
  }
}