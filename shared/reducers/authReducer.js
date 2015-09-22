const defaultState = {
  loaded: false,
  user: null,
  hasHome: false,
  err: null,
}

export default function authReducer(state = defaultState, action = {}) {
  switch(action.type) {
    case 'GET_USER':
      return {
        ...state,
        loading: true,
      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        loaded: true,
        loading: false,
        user: action.res.data,
        hasHome: action.res.data.homeId
      }
    case 'DELETE_USER':
      return {
        ...state,
        loaded: true,
        err: null,
      }
    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        user: null,
        err: null,
        deleted: true
      }
    case 'DELETE_USER_FAIL':
      return {
        ...state,
        loaded: true,
        loading: false,
        err: action.err
      }
      
    default:
      return state;
  }
}