import React, { Component } from 'react';

export default class LoadingScreen extends Component {
  render() {
    return(
      <div className="text-center" style={styles.base}>
        <span className="fa fa-3x fa-spinner fa-spin" />
        {this.props.children}
      </div>
    )
  }
}

const styles = {
  base: {

  }
}