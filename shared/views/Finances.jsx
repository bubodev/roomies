import React, { Component } from 'react';

export default class Finances extends Component {
  render() {
    return(
      <div style={styles.base}>
        <h1> Finances PAGE </h1>
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