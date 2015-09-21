import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

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

export default
class ShoppingListContainer {
  render() {
    return (
      <ShoppingList />
    )
  }
}