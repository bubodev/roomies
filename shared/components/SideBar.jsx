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
    return (
      <div style={[styles.sideBar, styles[this.state.sideBarShow], styles[this.props.status]]} key="sideBar">
        <ul className="list-group text-center">
        <div style={styles.thumbnail} >
          <img src="http://res.cloudinary.com/bitebox/image/upload/c_scale,w_150/v1434495985/default-avatar_oxtmnu.png" />
          <div className="caption">
            <h4> Example User </h4>
          </div>
        </div>
        <Link to="/home/dashboard" style={styles.linkItem}> 
          <li className="list-group-item" key="dashboard" style={styles.sideBarItem}>
            <span className="fa fa-tachometer" /> Dashboard
          </li> 
        </Link>
        <Link to="/home/chores" style={styles.linkItem}> 
          <li className="list-group-item" key="chores" style={styles.sideBarItem}>
            <span className="fa fa-tasks" /> Chores
          </li> 
        </Link>
        <Link to="/home/finances" style={styles.linkItem}> 
          <li className="list-group-item" key="finances" style={styles.sideBarItem}>
            <span className="fa fa-money" /> Finances
          </li> 
        </Link>
        <Link to="/home/shopping" style={styles.linkItem}> 
          <li className="list-group-item" key="shopping" style={styles.sideBarItem}>
            <span className="fa fa-cart-arrow-down" /> Shopping List
          </li> 
        </Link>
        </ul>
        <ul className="list-group text-center">
          <Link to="/home/finances" style={styles.linkItem}> 
            <li className="list-group-item" key="settings" style={styles.sideBarItem}>
              <span className="fa fa-cog" /> Settings
            </li> 
          </Link>
          <a href="/logout" style={styles.linkItem}> 
            <li className="list-group-item" key="signout" style={styles.sideBarItem}>
              <span className="fa fa-sign-out" /> Logout
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

var styles = {
  sideBar: {
    '@media (max-width: 767px)': {
      position: 'fixed',
      left: 0,
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
    top: '-800px'
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
    border: 'none',
    '@media (max-width: 767px)': {
      padding: '15px'
    }
  },

  disabled: {
    display: 'none'
  },

  thumbnail: {
    border: '1px solid grey',
    color: 'grey',
    width: '160px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}