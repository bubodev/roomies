import io from 'socket.io-client';

export function socketConnect (room) {
  return io('localhost:3000', {
    query: 'r_var='+room
  });
}