import Immutable from 'immutable'

const options = {
  loaded: false,
  collection: new Immutable.List(),
  err: null,
}

let defaultState = new Immutable.Map(options);

export default function taskReducer(state = defaultState, action) {
  console.log(action.type);
  let collection = state.get('collection');
  switch(action.type) {
    case 'GET_TASKS':
      return state.set('loading', true)
    case 'GET_TASKS_SUCCESS':
      let newCollection = new Immutable.List(action.res.data);
      return state.set('loading', false)
              .set('loaded', true)
              .set('collection', newCollection)
    case 'GET_TASKS_FAILURE':
      return state.set('err', action.err);
    case 'CREATE_TASK_SUCCESS':
      let addedCollection = collection.push(action.res.data)
      return state.set('collection', addedCollection)
    case 'EDIT_TASK':
      return  state.set(action.id, action.description)
    case 'COMPLETE_TASK':
      return state;
    case 'COMPLETE_TASK_SUCCESS':
      let idx = collection.findIndex((task) => {
        return task._id === action.res.data._id
      })

      let completedCollection = collection.set(idx, action.res.data);
      return state.set('collection', completedCollection)
    case 'DELETE_TASK':
      return state.delete(action.id)
    default:
      return state;
  }
}