import React, { Component } from 'react';

export default class Finances extends Component {
  render() {
    return(
      <div style={styles.base}>
        <div className="col-sm-4">
          Household costs
        </div>
        <div className="col-sm-4">
          Borrowing
        </div>
        <div className="col-sm-4">
          Lending
        </div>
      </div>
    )
  }
}

var styles = {
  base: {
    background: 'lightgrey'
  }
}