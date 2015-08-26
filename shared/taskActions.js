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

export function deleteTask(id) {
  return {
    type: 'DELETE_TASK',
    id
  }
}