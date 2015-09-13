import React, { Component } from 'react';

export default class RadioButtons extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: false
    }
  }

  toggleSelected(e) {
    e.preventDefault();
    this.setState({
      selected: !!this.state.selected
    })
  }

  render() {
    let options = this.props.values.map((opt) => {
      return (
        <button>
          {opt}
        </button>
      )
    })
    return (
      <div>
        {options}
      </div>
    )
  }
}