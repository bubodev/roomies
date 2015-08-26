import request from 'axios';

const BACKEND_URL = /* PUT BACKEND URL HERE */

export function getTasks() {
  return {
    type: 'GET_TASK',
    promise: request.get(BACKEND_URL)
  }
}

export function createTask(description, startDate, endDate, frequency, members) {
  return {
    type: 'CREATE_TASK',
    description,
    startDate,
    endDate,
    frequency,
    members
  }
}

export function editTask(id, description, startDate, endDate, frequency, members) {
  return {
    type: 'EDIT_TASK',
    id,
    description,
    startDate,
    endDate,
    frequency,
    members
  }
}

export function deleteTask(id) {
  return {
    type: 'DELETE_TASK',
    id
  }
}