const defaultState = {
  socket: null,
}

export default function socketReducer(state = defaultState, action = {}) {
  switch(action.type) {
    case 'SET_SOCKET_ID':
      return {
        ...state,
        socket: action.socket
      }
    default:
      return state;
  }
}