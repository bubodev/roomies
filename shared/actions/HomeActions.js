import request from 'axios';

const BACKEND_URL = '/api/homes'

export function getHome(homeId) {
  return {
    types: ['GET_HOME', 'GET_HOME_SUCCESS', 'GET_HOME_FAILURE'],
    promise: request.get(BACKEND_URL + '/' + homeId)
  }
}

export function addUserToHome(houseCode, userId) {
  return {
    types: ['ADD_USER', 'ADD_USER_SUCCESS', 'ADD_USER_FAILURE'],
    promise: request.put(BACKEND_URL + '/' + houseCode, {
      userId: userId
    })
  }
}

export function createHome(homeParams, userId) {
  return {
    types: ['CREATE_HOME', 'CREATE_HOME_SUCCESS', 'CREATE_HOME_FAILURE'],
    promise: request.post(BACKEND_URL, {
      homeParams: homeParams,
      userId: userId
    })
  }
}

export function editHome(id) {
  return {
    type: 'EDIT_HOME',
    id
  }
}

export function deleteHome(id) {
  return {
    type: 'DELETE_HOME',
    id
  }
}