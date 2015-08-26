import Immutable from 'Immutable'

const defaultState = new Immutable.List();

export default function taskReducer(state=defaultState, action) {
  switch(action.type) {
    case 'GET_TASK':
      return state.concat(action.res.data);
    case 'CREATE_TASK':
      return state.concat(action.description)
    case 'EDIT_TASK':
      return  state.set(action.id, action.description)
    case 'DELETE_TASK':
      return state.delete(action.id)
    default:
      return state;
  }
}