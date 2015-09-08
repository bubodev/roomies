import React from 'react';
import Radium from 'radium';

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

  handleClick = (e) => {
    e.preventDefault();
    this.context.router.transitionTo('/home');
  };

  render() {
    return (
      <nav className="navbar navbar-fixed-top" style={styles.navBar}>
        <div className="container-fluid">
          <div className="navbar-header">
            <div onClick={this.handleClick} style={styles.brand} className="navbar-brand">
              <h4><span className="glyphicon glyphicon-home"/> roomies</h4>
            </div>
          </div>
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
  }
}

Navbar.contextTypes = {
  router: React.PropTypes.object.isRequired
};