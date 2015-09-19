import React, { Component } from 'react';
import ColoredButton from './ColoredButton';

export default class UserInfoForm extends Component {
  render() {
    let status;
    if(!this.props.hasHome) {
      status = "disabled"
    }

    return(
      <div style={styles.base}>
        <h3 className="heading">I want to...</h3>
        <div className="row">
          <div className="col-sm-4 text-center">
            <ColoredButton disabled={status} color="muted" value="Change home info">
              <span className="fa-stack fa-3x">
                <span className="fa fa-home fa-stack-2x"/>
                <span className="fa fa-pencil fa-stack-1x text-muted"/>
              </span>
            </ColoredButton>
          </div>
          <div className="col-sm-4 text-center">
            <ColoredButton disabled={status} handleClick={::this.props.removeUser} color="danger" value="Leave this home">
              <span className="fa-stack fa-3x">
                <span className="fa fa-home fa-stack-1x"/>
                <span className="fa fa-ban fa-stack-2x"/>
              </span>
            </ColoredButton>
          </div>
          <div className="col-sm-4 text-center">
            <ColoredButton handleClick={::this.props.deleteUser} color="danger" value="Delete my account">
              <span className="fa-stack fa-3x">
                <span className="fa fa-user fa-stack-1x"/>
                <span className="fa fa-ban fa-stack-2x"/>
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