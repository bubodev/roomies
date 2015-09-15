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
      <Link to={this.props.route} style={styles.base}> 
        <li className={"list-group-item " + checkActive} key="dashboard" style={styles.listItem}>
          {this.props.children || null}
          <span className={"fa fa-" + this.props.faGlyph} /> {this.props.label}
        </li> 
      </Link>
    )
  }
}

const styles = {
  base: {
    textDecoration: 'none',
    color: 'darkgrey',
    ':hover': {
      color: 'black',
    }
  },

  listItem: {
    width: '100%',
    padding: '25px',
    textAlign: 'center',
    border: 'none',
    '@media (max-width: 767px)': {
      padding: '15px'
    },
    ':hover': {
      color: 'black'
    }
  },
}