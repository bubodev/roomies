const defaultState = {
  loaded: false,
  user: null
}

export default function authReducer(state = defaultState, action = {}) {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggingIn: true
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loggingIn: false,
        user: 'testing user'
      }
    case 'LOGIN_FAIL':
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      }
    case 'LOGOUT':
      return {
        ...state,
      }
    default:
      return state;
  }
}