export function load() {
  return {
    types: ['AUTH_LOAD', 'AUTH_LOAD_SUCCESS', 'AUTH_LOAD_FAIL'],
    promise: (client) => client.get('/loadAuth')
  };
}

export function login(credentials) {
  console.log("hitting login action");
  return {
    types: ['AUTH_LOGIN', 'AUTH_LOGIN_SUCCESS', 'AUTH_LOGIN_FAIL'],
    promise: (client) => client.post('/login', {
      data: {
        credentials: credentials
      }
    })
  };
}

export function logout() {
  return {
    types: ['AUTH_LOGOUT', 'AUTH_LOGOUT_SUCCESS', 'AUTH_LOGOUT_FAIL'],
    promise: (client) => client.get('/logout')
  };
}