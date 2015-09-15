import Immutable from 'immutable'

const defaultState = new Immutable.List();

export default function taskReducer(state=defaultState, action) {
  switch(action.type) {
    case 'GET_TASKS_SUCCESS':
      return state.concat(action.res.data);
    case 'CREATE_TASK_SUCCESS':
      return state.concat(action.res.data)
    case 'EDIT_TASK':
      return  state.set(action.id, action.description)
    case 'DELETE_TASK':
      return state.delete(action.id)
    default:
      return state;
  }
}