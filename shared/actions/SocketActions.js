import { socketConnect } from '../utils/socket';

export function setSocket(homeId) {
  let socket = socketConnect(homeId);
  socket.on('chat message', function(m) {
    console.log(m);
  })
  return {
    type: 'SET_SOCKET_ID',
    socket: socket
  }
}