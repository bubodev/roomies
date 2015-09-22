import React, { Component } from 'react';
import LoadingScreen from './LoadingScreen';
import * as taskActions from '../actions/TaskActions';

export default class WeekChores extends Component {
  debug() {
    debugger;
  }

  constructor(props, context) {
    super(props, context);
  }

  handleClick(id) {
    const homeId = this.props.home.home._id
    this.props._completeTask(homeId, id);
  }

  render() {
    let assignedTasks;
    if(this.props.home.home && this.props.home.home.tasks) {
      let allTasks = this.props.home.home.tasks
      assignedTasks = allTasks.filter((task) => {
        return task.currentUser === this.props.auth.user._id
      })
      assignedTasks = assignedTasks.map((task) => {
        let id = task._id
        return (
          <div>
            <li>
              {task.name}
              <button onClick={this.handleClick.bind(this, id)} className="btn btn-xs btn-primary">mark as completed</button>
            </li> 
          </div>
        )
      })
    }
    return(
      <ul>
        Your assigned chores...
        { assignedTasks }
      </ul>
    )
  }
}