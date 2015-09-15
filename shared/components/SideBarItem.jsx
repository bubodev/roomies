import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

@Radium
export default class SideBarItem extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let checkActive = "";
    if(this.props.currentRoute === this.props.route) {
      checkActive = "active"
    }
    return(
      <Link onClick={this.props.closeSideBar} to={this.props.route} style={styles.base}> 
        <li key="dashboard" style={[styles.listItem, styles[checkActive]]}>
          <span className={"pull-left fa fa-lg fa-" + this.props.faGlyph} /> 
          <span> {this.props.label} </span>
          <span className="pull-right"> {this.props.children || null} </span>
        </li> 
      </Link>
    )
  }
}

const styles = {
  base: {
    textDecoration: 'none',
    color: 'darkgrey',
  },

  active: {
    background: '#53595F',
    color: 'white',
  },

  listItem: {
    width: '100%',
    padding: '25px',
    textAlign: 'center',
    border: 'none',
    '@media (max-width: 767px)': {
      padding: '15px',
      ':hover': {
        color: 'black'
      }
    },
    ':hover': {
      color: 'white'
    }
  },
}