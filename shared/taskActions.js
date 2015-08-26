import request from 'axios';

const BACKEND_URL = /* NEED BACKEND URL HERE */

export function getTasks() {
  return {
    type: 'GET_TASKS',
    promise: request.get(BACKEND_URL)
  }
}

export function createTask(description, startDate, endDate, frequency, members) {
  return {
    type: 'CREATE_CHORE',
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

export function markTaskCompleted(id) {
  return {
    type: 'COMPLETE_TASK',
    id
  }
}

export function deleteTask(id) {
  return {
    type: 'DELETE_TASK',
    id
  }
}