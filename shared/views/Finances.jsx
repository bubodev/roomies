import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as transactionActions from '../actions/TransactionActions';
let ReactD3 = require('react-d3-components');
let PieChart = ReactD3.PieChart;

class Finances extends Component {
  render() {
    var data = {
      label: 'somethingA',
      values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    };

    var sort;

    return(
      <div style={styles.base}>
        <div style={styles.charts} className="row">
          <div className="col-sm-4">
            <PieChart
                  data={data}
                  width={400}
                  height={200}
                  margin={{top: 0, bottom: 0, left: 100, right: 100}}
                  sort={sort}/>
          </div>
          <div className="col-sm-4">
            <PieChart
                data={data}
                width={400}
                height={200}
                margin={{top: 0, bottom: 0, left: 100, right: 100}}
                sort={sort}/>
          </div>
          <div className="col-sm-4">
            <PieChart
                data={data}
                width={400}
                height={200}
                margin={{top: 0, bottom: 0, left: 100, right: 100}}
                sort={sort}/>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            Household costs
          </div>
          <div className="col-sm-4">
            Borrowing
          </div>
          <div className="col-sm-4">
            Lending
          </div>
        </div>
      </div>
    )
  }
}

var styles = {
  base: {
    background: 'lightgrey'
  },

  charts: {
    height: '30vh',
    background: 'darkgrey'
  }
}

@connect(state => ({
  transactions: state.transactions
}))

export default 
class FinancesContainer {
  static propTypes = {
    transactions: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { transactions, dispatch } = this.props;
    return <Finances transactions={transactions} {...bindActionCreators(transactionActions, dispatch)}  />
  }
}