import React, { Component } from 'react';

export default class WeekChores extends Component {
  debug() {
    debugger;
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
      <div>
        <button onClick={::this.debug} />
        {this.props.home}
      </div>
    )
  }
}