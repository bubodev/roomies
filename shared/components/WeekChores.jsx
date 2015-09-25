import React, { Component } from 'react';
import LoadingScreen from './LoadingScreen';

export default class WeekChores extends Component {
  debug() {
    debugger;
  }

  constructor(props, context) {
    super(props, context);
  }

  handleClick(id) {
    const homeId = this.props.home.home._id
    let completedTime = new Date();
    this.props.completeTask(homeId, id, completedTime)
    .then(status => {
      if(status.type === "COMPLETE_TASK_SUCCESS") {
        this.props.emitChange(this.props.socket, homeId);
      }
    })
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
        let completeBy;

        if(task.lastCompleted) {
          completeBy = new Date(task.lastCompleted);
        } else {
          completeBy = new Date(task.startDate);
        }
        completeBy.setDate(completeBy.getDate() + task.frequency);
        
        let id = task._id

        return (
          <div key={task._id} className="col-md-3 col-sm-4 col-lg-2" style={styles.taskItem}>
            <div>
              <h4> {task.name} </h4>
              <label>description</label>
              <br/>
                {task.description.join(', ')}
              <br/>
              <label>Complete by: &nbsp;</label>
                { completeBy.toJSON().slice(0,10) }
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
        <div style={styles.listContainer} className="row">
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