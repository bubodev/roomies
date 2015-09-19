import request from 'axios';

export function login() {
  return {
    types: ['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_FAIL'],
    promise: request.get('/auth/google')
  }
}

export function logout() {
  return {
    types: ['LOGOUT', 'LOGOUT_SUCCESS', 'LOGOUT_FAIL'],
    promise: request.get('/logout')
  }
}

export function loadUser(id) {
  return {
    types: ['GET_USER', 'GET_USER_SUCCESS', 'GET_USER_FAIL'],
    promise: request.get('/api/users/' + id)
  }
}

export function deleteUser(id) {
  return {
    types: ['DELETE_USER', 'DELETE_USER_SUCCESS', 'DELETE_USER_FAIL'],
    promise: request.delete('/api/users')
  }
}