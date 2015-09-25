import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { layout } from './styles';
import * as socketActions from '../actions/SocketActions';
import { Spring } from 'react-motion';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
  }

  scrollBottom() {
    let chatBox = React.findDOMNode(this.refs.chatBox)
    chatBox.scrollTop = chatBox.scrollHeight
  }

  handleClick(e) {
    e.preventDefault()
    let message = React.findDOMNode(this.refs.message);
    this.props.sendChat(this.props.socket, this.props.homeId, this.props.userName, message.value)
    message.value = "";
  }

  componentDidMount() {
    this.scrollBottom();
  }

  componentDidUpdate() {
    this.scrollBottom();
  }

  render() {
    let idx = 0;
    let that = this;
    let chatMessages = this.props.messages.map(function(message) {
      let itemStyle = {
        padding: 10,
        margin: 10,
        borderRadius: 10,
      };
      idx++;
      let output, startValue;

      if(message[0] === that.props.userName){
        itemStyle.textAlign = 'right';
        itemStyle.paddingLeft = '15%';
        startValue = { left: {val: -50} };
      } else {
        itemStyle.textAlign = 'left';
        itemStyle.paddingRight = '15%';
        startValue = { left: {val: 50} };
      }

      output = <div><span>" {message[1]} "</span> <br/> <small> - {message[0]}</small> <span className="fa fa-user" /></div>

      return(
        <Spring key={idx} defaultValue={startValue} endValue={{left: {val: 0, config: [120, 11]}}}>
          {t => {
            let tween = {
              left: t.left.val,
              position: 'relative'
            }

            return(
              <div style={tween}>
                <li style={itemStyle}>
                  { output }
                </li>
              </div>
            )
          }}
        </Spring>
      )
    })

    return(
      <div style={layout.base}>
        <div className="title">
          Chat
        </div>
        <div className="mainContent">
          <div style={{paddingBottom: 140}}className="col-md-8 col-md-offset-2 col-lg-10 col-lg-offset-1 base-container">

              <ul ref="chatBox" className="scroll list-group">
                {chatMessages}
              </ul>

          </div>
          <div style={styles.pushBottom}>
            <form>
            <input className="form-control" ref="message" type="text" />
            <button className="btn btn-default" onClick={::this.handleClick}> Send message </button>
            </form>
          </div>
        </div>
      </div>  
    )
  }
}

const styles = {
  pushBottom: {
    position: 'fixed',
    bottom: 65,
    paddingLeft: '5%',
    paddingRight: '10%'
  },
}

@connect(state => ({
  messages: state.io.get('messages'),
  socket: state.io.get('socket'),
  homeId: state.home.home && state.home.home._id,
  userName: state.auth.user && state.auth.user.name
}))

export default class ChatContainer {
  static propTypes = {
    messages: PropTypes.object,
    socket: PropTypes.object,
    homeId: PropTypes.string,
    userName: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { socket, homeId, userName, messages, dispatch } = this.props;
    return <Chat messages={messages} socket={socket} homeId={homeId} userName={userName} {...bindActionCreators(socketActions, dispatch)}/>;
  }
}