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
    case 'CREATE_HOME_FAILURE':
      return {
        ...state,
        loading: false,
        loaded: false,
        err: action.res.data
      }
    case 'ADD_USER':
      return {
        ...state,
        loading: true,
        loaded: false,
      }
    case 'ADD_USER_SUCCESS':
      return {
        ...state,
        loaded: true,
        loading: false,
        home: action.res.data
      }
    case 'ADD_USER_FAILURE':
      return {
        ...state,
        loaded: false,
        loading: false,
        err: action.err
      }
    default:
      return state;
  }
}