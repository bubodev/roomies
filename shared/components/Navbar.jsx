import React from 'react';
import Radium from 'radium';

var styles = {
  navBar: {
    color: 'white',
  }
}

@Radium
export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar test navbar-fixed-top" style={styles.navBar}>
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="navbar-brand">
              <h4><span className="glyphicon glyphicon-home"/> roomies</h4>
            </div>
          </div>
        </div>
      </nav>
    )
  };
}