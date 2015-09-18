import React, { Component } from 'react';
import Radium from 'radium';
import { colors } from './styles';
import { Spring } from 'react-motion';

const defaultValue = {
  opacity: {
    val: 0
  },

  top: {
    val: 300
  }
}

const endValue = {
  opacity: {
    val: 1
  },

  top: {
    val: 0
  }
}

@Radium

export default class Footer extends Component {
  render() {
    return (
      <Spring defaultValue={defaultValue} endValue={endValue}>
        {t => {
          let fade = {
            opacity: t.opacity.val,
            top: t.top.val
          }

          return(
            <div className="text-center" style={[styles.base, fade]}>
              <a key="github"href="https://github.com/cjhkim/roomies">
                <span className="fa-stack fa-lg">
                  <i className="fa fa-square-o fa-stack-2x"></i>
                  <i className="fa fa-github fa-stack-1x"></i>
                </span>
              </a>
              <a key="linkedin"href="https://www.linkedin.com/in/carljkim">
                <span className="fa-stack fa-lg">
                  <i className="fa fa-square-o fa-stack-2x"></i>
                  <i className="fa fa-linkedin fa-stack-1x"></i>
                </span>
              </a>
              <a key="user"href="http://cjhkim.github.io/">
                <span className="fa-stack fa-lg">
                  <i className="fa fa-square-o fa-stack-2x"></i>
                  <i className="fa fa-user fa-stack-1x"></i>
                </span>
              </a>
              <br />
              <span className="fa fa-copyright"> carl kim</span>
            </div>
          )
        }}
      </Spring>
    )
  }
}

const styles = {
  base: {
    width: '100%',
    position: 'relative',
  },
}