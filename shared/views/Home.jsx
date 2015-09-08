import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return(
      <div className="container-fluid" style={styles.base}>
        <div className="row">
          <div key="sideBar" style={styles.sideBar} className="col-sm-3">
            side bar
          </div>
          <div style={styles.mainSection} className="col-sm-9">
            main section
          </div>
        </div>
      </div>
    )
  }
}

var styles = {
  base: {
    paddingTop: '65px',
    backgroundColor: 'lightgrey'
  },

  sideBar: {
    backgroundColor: 'white',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },

  mainSection: {
  },

  sideBarItem: {
    width: '100%',
    padding: '30px',
    textAlign: 'center',
    border: '1px solid black'
  }
}