import React, { Component } from 'react';
import WeekChores from './WeekChores';

export default class Overview extends Component {
  render() {
    return(
      <div style={styles.base} className="container-fluid">
        <h1>Overview</h1>
        <div className="row">
          <WeekChores />
        </div>
      </div>
    )
  }
}

const styles = {
  base: {
  }
}