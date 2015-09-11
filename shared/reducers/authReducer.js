const defaultState = {
  loaded: false,
  user: null,
  hasHome: false
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
        hasHome: action.res.data.hasHome
      }
    default:
      return state;
  }
}