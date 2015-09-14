import React, { Component } from 'react';

export default class LoadingScreen extends Component {
  render() {
    return(
      <div>
        <span className="fa fa-3x fa-spinner fa-spin" />
      </div>
    )
  }
}