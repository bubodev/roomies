const defaultState = {
  loaded: false,
  home: null,
}

export default function homeReducer(state = defaultState, action = {}) {
  switch(action.type) {
    case 'GET_HOME':
      return {
        ...state,
        loading: true,
      }
    case 'GET_HOME_SUCCESS':
      return {
        ...state,
        loaded: true,
        loading: false,
        home: action.res.data,
      }
    case 'CREATE_HOME':
      return {
        ...state,
        loading: true
      }
    case 'CREATE_HOME_SUCCESS':
      return {
        ...state,
        loading: false,
        loaded: true,
        home: action.res.data
      }
    default:
      return state;
  }
}