import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { layout } from './styles'

class ShoppingList extends Component {
  render() {
    return(
      <div style={layout.base}>
        <div className="title">
          Shopping List
        </div>
        <div key='shopping' className="mainContent">
          <h1>Coming soon!</h1>
        </div>
      </div>
    )
  }
}

@connect( state => ({
}))

export default
class ShoppingListContainer {
  static propTypes = {
  }

  render() {
    return (
      <ShoppingList />
    )
  }
}