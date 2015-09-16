import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Modal extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let bgColor = {
      background: this.props.color || 'rgba(0,0,0,0.7)'
    }
    return(
      <div style={[styles.base, bgColor, styles[this.props.show]]}>
        <span onClick={this.props.close} style={styles.closeButton} className="fa fa-2x fa-times"/>
        {this.props.children}
      </div>
    )
  }
}

const styles = {
  base: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    color: 'white',
    paddingTop: '100px',
    overflow: 'scroll',
    paddingBottom: '100px',
  },

  closeButton: {
    position: 'fixed',
    top: '60px',
    right: '60px',
    ':hover': {
      cursor: 'pointer'
    }
  },

  show: {
    display: 'block',
  },

  hide: {
    display: 'none'
  }
}