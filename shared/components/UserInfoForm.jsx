import React, { Component } from 'react';
import ColoredButton from './ColoredButton';

export default class UserInfoForm extends Component {
  render() {
    return(
      <div style={styles.base}>
        <h3 className="heading">I want to...</h3>
        <div className="row">
          <div className="col-sm-4 text-center">
            <ColoredButton color="muted" value="Change home info">
              <span className="fa-stack fa-3x">
                <span className="fa fa-home fa-stack-2x"/>
                <span className="fa fa-pencil fa-stack-1x text-muted"/>
              </span>
            </ColoredButton>
          </div>
          <div className="col-sm-4 text-center">
            <ColoredButton color="muted" value="Leave this home">
              <span className="fa-stack fa-3x">
                <span className="fa fa-home fa-stack-1x"/>
                <span className="fa fa-ban fa-stack-2x text-danger"/>
              </span>
            </ColoredButton>
          </div>
          <div className="col-sm-4 text-center">
            <ColoredButton color="muted" value="Delete my account">
              <span className="fa-stack fa-3x">
                <span className="fa fa-user fa-stack-1x"/>
                <span className="fa fa-ban fa-stack-2x text-danger"/>
              </span>
            </ColoredButton>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  base: {
  }
}