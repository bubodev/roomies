import request from 'axios';

const BACKEND_URL = '/api/transactions'

export function getTransactions() {
  return {
    types: ['GET_TRANSACTIONS', 'GET_TRANSACTIONS_SUCCESS', 'GET_TRANSACTIONS_FAILURE'],
    promise: request.get(BACKEND_URL)
  }
}

export function createTransaction(transactionParams) {
  return {
    types: ['CREATE_TRANSACTIONS','CREATE_TRANSACTIONS_SUCCESS','CREATE_TRANSACTIONS_FAILURE'],
    promise: request.post(BACKEND_URL, {
      transactionParams: transactionParams,
    })
  }
}

export function deleteTransaction(id) {
  return {
    type: 'DELETE_TRANSACTIONS',
    id
  }
}