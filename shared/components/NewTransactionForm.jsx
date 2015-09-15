import React, { Component } from 'react';

export default class NewTransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true }
  }

  toggleShow() {
    this.setState({
      hidden: !this.state.hidden
    })
  }

  submitForm(e) {
    e.preventDefault();
    let transParams = {};
    transParams.name = this.refs.name.getDOMNode().value;
    transParams.date = this.refs.date.getDOMNode().value;
    transParams.amount = parseInt(this.refs.amount.getDOMNode().value);
    transParams.type = this.props.type;
    this.props._submitNewTransaction(transParams);
    this.setState({
      hidden: true
    })
  }

  render() {
    let show;
    if(this.state.hidden) {
      show = (
        <div>
          <button className="btn btn-default btn-xs" onClick={::this.toggleShow}>
            <span className="glyphicon glyphicon-plus"/>
          </button>
        </div>
      )
    } else {
      show = (
        <div>
          <form onSubmit={::this.submitForm} >
            <input ref="name" type="text" className="form-control" placeholder="description"/>
            <input ref="amount" type="text" className="form-control" placeholder="amount"/>
            <input ref="date" type="date" className="form-control"/>
            <input onClick={::this.submitForm} type="submit">Submit</input>
          </form>
          <button className="btn btn-default btn-xs" onClick={::this.toggleShow}>
            <span className="glyphicon glyphicon-remove"/>
          </button>
        </div>
      )
    }
  
    return <div> {show} </div>
  }
}