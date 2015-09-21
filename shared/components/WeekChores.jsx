import React, { Component } from 'react';
import LoadingScreen from './LoadingScreen';

export default class WeekChores extends Component {
  debug() {
    debugger;
  }

  constructor(props, context) {
    super(props, context);
  }

  handleClick(e) {
    alert("will be implemented soon!")
  }

  render() {
    let assignedTasks;
    if(this.props.home.home && this.props.home.home.tasks) {
      let allTasks = this.props.home.home.tasks
      assignedTasks = allTasks.filter((task) => {

        return task.currentUser === this.props.auth.user._id
      })
      assignedTasks = assignedTasks.map((task) => {
        return (
          <div>
            <li>
              {task.name}
              <button onClick={::this.handleClick}className="btn btn-xs btn-primary">mark as completed</button>
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