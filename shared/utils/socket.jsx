var io = require('socket.io-client');
import { getTasks } from '../actions/TaskActions';
import { receiveChat } from '../actions/SocketActions';

export function socketConnect (room, dispatch) {
  var socket = io('rooomies.herokuapp.com', {
    query: 'r_var='+room
  });

  /** SETUP LISTENERS **/

  //future chat?
  socket.on('chat message', function(m) {
    dispatch(receiveChat(m))
  })

  //need to refresh tasks
  socket.on('refresh tasks', function(homeId) {
    dispatch(getTasks(homeId));
  })

  return socket;
}