import React, { Component } from 'react';

export default class ColoredButton extends Component {
  handleClick() {
    if(!this.props.disabled)
      this.props.handleClick();
  }
  render() {
    return(
      <button onClick={::this.handleClick} className={"btn btn-" + this.props.color + " " + this.props.disabled} style={styles.base}>
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
    height: '120px',
    width: '80%',
  },

  value: {
    width: '100%'
  }
}