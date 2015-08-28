import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return(
      <div style={styles.base}>
        <h1> ABOUT PAGE </h1>
      </div>
    )
  }
}

var styles = {
  base: {
    paddingTop: '51px',
    background: 'lightgrey'
  }
}