import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

const accentColor = '#00DFFF';

var styles = {
  navBar: {
    color: 'white',
  }
}

@Radium
export default class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  debuggerToggle() {
    debugger;
  }

  handleClick = (path) => {
    this.context.router.transitionTo(path);
  };

  render() {
    return (
      <nav className="navbar navbar-fixed-top" style={styles.navBar}>
        <div className="container-fluid">
          <div className="navbar-header">
            <div onClick={this.handleClick.bind(this, '/home')} style={styles.brand} className="navbar-brand">
              <h4><span className="glyphicon glyphicon-home"/> roomies</h4>
            </div>
            <button style={styles.debug} onClick={::this.debuggerToggle}>debug button here</button>

          </div>

          <ul className="nav navbar-nav navbar-right">
            <Link to="about"> About </Link>
            <a href="/logout"> Logout </a>
          </ul>
        </div>
      </nav>
    )
  };
}

var styles = {
  brand: {
    color: 'white',
    ':hover': {
      color: accentColor,
      cursor: 'pointer'
    }
  },

  debug: {
    position: 'fixed',
    top: 0,
  }
}

Navbar.contextTypes = {
  router: React.PropTypes.object.isRequired
};