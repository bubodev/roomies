import React from 'react';
import Radium from 'radium';

const accentColor = '#00DFFF';

@Radium
export default class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let tasks;
    if(this.props.tasks){
      tasks = this.props.tasks.map(function(task) {
        return (
          <div key={task._id} style={styles.sideBarItem}>
            task: {task.taskName}
            <br />
            start: {task.startDate}
            <br />
            end: {task.endDate}
            <br />
          </div>
        )
      })
    }

    console.log(this.props.tasks);
    return (
      <div className="col-sm-3" style={styles.sideBar}>
        { tasks }
      </div>
    )
  };
}

var styles = {
  sideBar: {
    backgroundColor: 'white',
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