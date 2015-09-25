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

export function sendChat(socket, homeId, name, message) {
  socket.emit('chat message', [name, message])

  return {
    type: 'SEND_CHAT',
    socket: socket
  }
}

export function receiveChat(message) {
  return {
    type: 'RECEIVE_CHAT_MESSAGE',
    message: message
  }
}