import jsonp from 'jsonp';

export function login() {
  return {
    types: ['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_FAIL'],
    promise: jsonp('/auth/google')
  }
}

export function logout() {
  return {
    types: ['LOGOUT', 'LOGOUT_SUCCESS', 'LOGOUT_FAIL'],
    promise: jsonp('/logout')
  }
}