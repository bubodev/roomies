import React, { Component } from 'react';
import WeekChores from './WeekChores';

export default class Overview extends Component {
  render() {
    return(
      <div>
        <WeekChores {...this.props}/>
      </div>
    )
  }
}