import request from 'axios';

const BACKEND_URL = '/api/tasks'

export function getTasks() {
  return {
    types: ['GET_TASKS', 'GET_TASKS_SUCCESS', 'GET_TASKS_FAILURE'],
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