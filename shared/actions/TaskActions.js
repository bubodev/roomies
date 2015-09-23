import request from 'axios';

const BACKEND_URL = '/api/tasks'

export function getTasks(homeId) {
  return {
    types: ['GET_TASKS', 'GET_TASKS_SUCCESS', 'GET_TASKS_FAILURE'],
    promise: request.get(BACKEND_URL + '/' + homeId)
  }
}

export function createTask(taskParams) {
  return {
    types: ['CREATE_TASK','CREATE_TASK_SUCCESS','CREATE_TASK_FAILURE'],
    promise: request.post(BACKEND_URL, {
      taskParams: taskParams,
    })
  }
}

export function completeTask(homeId, taskId, completedTime) {
  return {
    types: ['COMPLETE_TASK', 'COMPLETE_TASK_SUCCESS', 'COMPLETE_TASK_FAILURE'],
    promise: request.put(BACKEND_URL + '/' + taskId, {
      homeId: homeId,
      completedTime: completedTime.toDateString(),
    })
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