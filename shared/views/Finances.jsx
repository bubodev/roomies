import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as transactionActions from '../actions/TransactionActions';
import NewTransactionForm from '../components/NewTransactionForm';

let ReactD3 = require('react-d3-components');
let PieChart = ReactD3.PieChart;

class Finances extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTransactions();
  }

  render() {
    let data = {
      label: 'somethingA',
      values: [{x: 'somethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    };
    let sort;

    return(
      <div style={styles.base}>
        <div style={styles.charts} className="row">
          <div className="col-sm-12 text-center">
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            Household costs
            {this.props.transactions.map(function(transaction){
              if(transaction.type === 'HOUSE'){
                return <div key={transaction._id}> {transaction.description} {transaction.amount} </div>
              } else {
                return null
              }
            })}
            <NewTransactionForm type="HOUSE" _submitNewTransaction={this.props.createTransaction} />
          </div>
          <div className="col-sm-4">
            Lending
            {this.props.transactions.map(function(transaction){
              if(transaction.type === 'IN'){
                return <div key={transaction._id}> {transaction.description} {transaction.amount} </div>
              } else {
                return null
              }
            })}
            <NewTransactionForm type="IN" _submitNewTransaction={this.props.createTransaction} />
          </div>
          <div className="col-sm-4">
            Borrowing
            {this.props.transactions.map(function(transaction){
              if(transaction.type === 'OUT'){
                return <div key={transaction._id}> {transaction.description} {transaction.amount} </div>
              } else {
                return null
              }
            })}
          </div>
        </div>
      </div>
    )
  }
}

var styles = {
  base: {
  },

  charts: {
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