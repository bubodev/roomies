import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SideBar extends Component {
  render () {
    return (
      <div style={styles.sidebar}>
        Navigation
          <ul className="list-group text-center">
          <Link to="/home/dashboard"> 
            <li className="list-group-item">
              <span className="fa fa-tachometer" /> Dashboard
            </li> 
          </Link>
          <Link to="/home/chores"> 
            <li className="list-group-item">
              <span className="fa fa-tasks" /> Chores
            </li> 
          </Link>
          <Link to="/home/finances"> 
            <li className="list-group-item">
              <span className="fa fa-money" /> Finances
            </li> 
          </Link>
          <Link to="/home/shopping"> 
            <li className="list-group-item">
              <span className="fa fa-cart-arrow-down" /> Shopping List
            </li> 
          </Link>
          </ul>
        Account
          <ul className="list-group text-center">
            <Link to="/home/finances"> 
              <li className="list-group-item">
                <span className="fa fa-cog" /> Settings
              </li> 
            </Link>
            <a href="/logout"> 
              <li className="list-group-item">
                <span className="fa fa-sign-out" /> Logout
              </li> 
            </a>
          </ul>
      </div>
    )
  }
}

var styles = {
  sideBar: {
    backgroundColor: 'white',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },

    sideBarItem: {
    width: '100%',
    padding: '30px',
    textAlign: 'center',
    border: '1px solid black'
  }
}