import Immutable from 'immutable'

const defaultState = new Immutable.List();

export default function transactionReducer(state=defaultState, action) {
  switch(action.type) {
    case 'GET_TRANSACTIONS_SUCCESS':
      return state.concat(action.res.data);
    case 'CREATE_TRANSACTION_SUCCESS':
      return state.concat(action.res.data)
    case 'EDIT_TRANSACTION':
      return  state.set(action.id, action.description)
    case 'DELETE_TRANSACTION':
      return state.delete(action.id)
    default:
      return state;
  }
}