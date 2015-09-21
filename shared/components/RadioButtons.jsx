import React, { Component } from 'react';
import Radium from 'radium';

@Radium
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

  setSelected(opt) {
    this.props.setSelected(opt)
  }

  render() {
    let options = this.props.values.map((opt, i) => {
      let highlighted;
      if(this.props.currentSelected === opt)
        highlighted = {
          color: 'white',
          borderBottom: '4px dashed white'
        }
      return (
        <span onClick={this.setSelected.bind(this, opt)} key={i} style={[styles.buttonBase, highlighted]}>
          {opt}
        </span>
      )
    })
    return (
      <div>
        {options}
      </div>
    )
  }
}

const styles = {
  buttonBase: {
    background: 'none',
    color: 'lightgrey',
    marginRight: '20px',
    ':hover': {
      cursor: 'pointer',
    }
  }
}