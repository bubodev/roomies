import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

@Radium
class ShoppingList extends Component {
  render() {
    return(
      <div style={styles.base}>
        <h1> Shopping List </h1>
      </div>
    )
  }
}

const styles = {
  base: {
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