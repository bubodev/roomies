import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { layout } from './styles';
import * as socketActions from '../actions/SocketActions';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleClick(e) {
    e.preventDefault()
    let message = React.findDOMNode(this.refs.message);
    this.props.sendChat(this.props.socket, this.props.homeId, this.props.userName, message.value)
    message.value = "";
  }

  render() {
    return(
      <div style={layout.base}>
        <div className="title">
          Chat
        </div>
        <div className="mainContent">
          <div className="col-sm-12 base-container">
            <div className="scroll">
              This is a chat component
              <input className="form-control" ref="message" type="text" />
              <button className="btn btn-default" onClick={::this.handleClick}> Send message </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

@connect(state => ({
  socket: state.io.socket,
  homeId: state.home.home && state.home.home._id,
  userName: state.auth.user && state.auth.user.name
}))

export default class ChatContainer {
  static propTypes = {
    socket: PropTypes.object,
    homeId: PropTypes.string,
    userName: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { socket, homeId, userName, dispatch } = this.props;
    return <Chat socket={socket} homeId={homeId} userName={userName} {...bindActionCreators(socketActions, dispatch)}/>;
  }
}