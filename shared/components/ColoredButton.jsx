import React, { Component } from 'react';

export default class ColoredButton extends Component {
  render() {
    return(
      <button className={"btn btn-" + this.props.color} style={styles.base}>
        <span style={styles.value}>{this.props.value}</span>
        <br/>
        {this.props.children}
      </button>
    )
  }
}

const styles = {
  base: {
    padding: '10px',
    margin: '20px',
    height: '150px',
    width: '80%',
  },

  value: {
    width: '100%'
  }
}