import io from 'socket.io-client';
import { getTasks } from '../actions/TaskActions';

export function socketConnect (room, dispatch) {
  var socket = io('localhost:3000', {
    query: 'r_var='+room
  });

  /** SETUP LISTENERS **/

  //future chat?
  socket.on('chat message', function(m) {
    console.log(m);
  })

  //need to refresh tasks
  socket.on('refresh tasks', function(homeId) {
    dispatch(getTasks(homeId));
  })

  return socket;
}