import { socketConnect } from '../utils/socket';

export function setSocket(homeId, dispatch) {
  let socket = socketConnect(homeId, dispatch);

  return {
    type: 'SET_SOCKET_ID',
    socket: socket
  }
}

export function emitChange(socket, homeId) {
  socket.emit('change tasks', homeId)

  return {
    type: 'EMIT_CHANGE',
    socket: socket
  }
}