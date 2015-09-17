import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

import { accentColor } from './styles'

@Radium
export default class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleClick = (path) => {
    this.context.router.transitionTo(path);
  };

  render() {
    return (
      <nav className="navbar navbar-fixed-top" style={styles.base}>
        <div style={styles.base}>
          <div className="navbar-header col-sm-3 col-lg-2 text-center">
            <div onClick={this.handleClick.bind(this, '/home')} style={styles.brand} className="navbar-brand">
              <h4><span className="fa fa-home"/> roomies</h4>
            </div>
          </div>
        </div>
      </nav>
    )
  };
}

var styles = {
  base: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  brand: {
    color: 'white',
    width: '100%',
    ':hover': {
      color: accentColor,
      cursor: 'pointer'
    }
  }
}

Navbar.contextTypes = {
  router: React.PropTypes.object.isRequired
};