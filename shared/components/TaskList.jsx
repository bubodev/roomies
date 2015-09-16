import React from 'react';
import Radium from 'radium';

const accentColor = '#00DFFF';

@Radium
export default class TaskList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let tasks;
    if(this.props.tasks){
      tasks = this.props.tasks.map(function(task) {
        return (
          <div key={task._id} className="col-sm-3 thumbnail">
            task: {task.name}
            <br />
            start: {task.startDate.slice(0,10)}
            <br />
            end: {task.endDate.slice(0,10)}
            <br />
            description: {task.description.join(', ')}
            <br />
            frequency: {task.frequency}
          </div>
        )
      })
    }
    
    return (
      <div className="col-sm-12" style={styles.sideBar}>
        { tasks }
      </div>
    )
  };
}

var styles = {
  sideBar: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },

    sideBarItem: {
    width: '100%',
    padding: '30px',
    textAlign: 'center',
    border: '1px solid black'
  }
}