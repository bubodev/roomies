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
    this.props.completeTask(homeId, id);
  }

  render() {
    let assignedTasks;
    if(this.props.tasks) {
      let allTasks = this.props.tasks
      let userId = this.props.userId
      assignedTasks = allTasks.filter((task) => {
        return task.currentUser === userId
      })

      assignedTasks = assignedTasks.map((task) => {
        let id = task._id
        return (
          <div key={task._id} style={styles.taskItem}>
            <div>
              <h4> {task.name} </h4>
              <label>description</label>
              <br/>
                {task.description.join(', ')}
              <br/>
              <button onClick={this.handleClick.bind(this, id)} className="btn btn-sm btn-primary">mark as completed</button>
            </div> 
          </div>
        )
      })
      
    }
    return(
      <div>
        Your assigned chores...
        <br/>
        <div style={styles.listContainer} className="col-sm-8 col-sm-offset-2">
          <div>
          { assignedTasks }
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  taskItem: {
    background: 'rgba(0,0,0,0) !important',
    padding: 15
  },

  listContainer: {

  }
}