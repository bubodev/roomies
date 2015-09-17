import React, { Component } from 'react';
import Radium from 'radium';

import { colors } from './styles'

@Radium

export default class Footer extends Component {
  render() {
    return (
      <div className="text-center" style={styles.base}>
        <a style={colors.link} key="github"href="https://github.com/cjhkim/roomies">
          <span className="fa-stack fa-lg">
            <i className="fa fa-square-o fa-stack-2x"></i>
            <i className="fa fa-github fa-stack-1x"></i>
          </span>
        </a>
        <a style={colors.link} key="linkedin"href="https://www.linkedin.com/in/carljkim">
          <span className="fa-stack fa-lg">
            <i className="fa fa-square-o fa-stack-2x"></i>
            <i className="fa fa-linkedin fa-stack-1x"></i>
          </span>
        </a>
        <a style={colors.link} key="user"href="http://cjhkim.github.io/">
          <span className="fa-stack fa-lg">
            <i className="fa fa-square-o fa-stack-2x"></i>
            <i className="fa fa-user fa-stack-1x"></i>
          </span>
        </a>
        <br />
        <span className="fa fa-copyright"> carl kim</span>
      </div>
    )
  }
}

const styles = {
  base: {
    width: '100%',
  },
}