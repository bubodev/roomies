import React, { Component, PropTypes } from 'react';
import WeekChores from './WeekChores';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as taskActions from '../actions/TaskActions';
import * as socketActions from '../actions/SocketActions';

class Overview extends Component {
  render() {
    return(
      <div>
        <WeekChores {...this.props}/>
      </div>
    )
  }
}

@connect(state => ({
  tasks: state.tasks.get('collection'),
  home: state.home,
  socket: state.io.get('socket'),
  userId: state.auth.user._id,
}))

export default
class OverviewContainer {
  static propTypes = {
    tasks: PropTypes.object,
    home: PropTypes.object,
    userId: PropTypes.string,
    socket: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { home, socket, tasks, userId, dispatch } = this.props;
    return <Overview socket={socket} tasks={tasks} userId={userId} home={home} {...bindActionCreators(taskActions, dispatch)} {...bindActionCreators(socketActions, dispatch)} />;
  }
}