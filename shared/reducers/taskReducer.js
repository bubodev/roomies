import Immutable from 'Immutable'

const defaultState = new Immutable.List();

export default function taskReducer(state=defaultState, action) {
  switch(action.type) {
    case 'CREATE_TASK':
      //create task action
      return 
    case 'EDIT_TASK':
      //edit task actions
      return
    case 'COMPLETE_TASK':
      //mark complete actions
      return
    case 'DELETE_TASK':
      //delete task action
      return state.delete(action.id)
    default:
      return state;
  }
}