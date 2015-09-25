import Immutable from 'immutable';

const options = {
  socket: null,
  messages: new Immutable.List()
}

let defaultState = new Immutable.Map(options);

export default function socketReducer(state = defaultState, action = {}) {
  let messages = state.get('messages');
  switch(action.type) {
    case 'SET_SOCKET_ID':
      return state.set('socket', action.socket)
    case 'SEND_CHAT':
      return state.slice()
    case 'EMIT_CHANGE':
      return state.slice()
    case 'RECEIVE_CHAT_MESSAGE':
      let addedMessages = messages.push(action.message);
      return state.set('messages', addedMessages)
    default:
      return state;
  }
}