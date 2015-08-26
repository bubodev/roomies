import React from 'react';

export default class AppView extends React.Component {
  render() {
    return(
      <div id="app-view">
        <h1>Chore split (Top level Component)</h1>
        <hr />
        {this.props.children}
      </div>
    );
  }
}