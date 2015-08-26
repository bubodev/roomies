import request from 'axios';

const BACKEND_URL = /* PUT BACKEND URL HERE */

export function load() {
  return {
    type: 'AUTH_LOAD',
    promise: request.get('/loadAuth')
  };
}

export function login(name, password) {
  return {
    type: 'AUTH_LOGIN',
    promise: request.post('/login', {
      data: {
        name: name
        password: password
      }
    })
  };
}

export function logout() {
  return {
    type: 'AUTH_LOGOUT',
    promise: request.get('/logout')
  };
}