import React from 'react';

export default class AppView extends React.component {
  render() {
    return(
      <div id="app-view">
        <h1>Chore split Top level component</h1>

        <hr />

        {this.props.children}
      </div>
    );
  }
}