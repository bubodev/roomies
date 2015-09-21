import React from 'react';
import Radium from 'radium';

const accentColor = '#00DFFF';

@Radium
export default class TaskList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let tableItems;
    if(this.props.tasks){
      tableItems = this.props.tasks.map(function(task) {
        return (
          <tr key={task._id}>
            <td>{task.name}</td>
            <td>{task.description.join(', ')}</td>
            <td>{task.frequency} days</td>
            <td>{task.currentUser}</td>
            <td> tbd </td>
          </tr>
        )
      })
    }
    
    return (
      <div className="col-sm-12" style={styles.sideBar}>
        <div className="panel-heading">house chore list</div>
        <table className="table" style={styles.table}>
          <tbody>
          <tr>
            <th>Chore</th>
            <th>Description</th>
            <th>Frequency</th>
            <th>Assigned to</th>
            <th>Finish by</th>
          </tr>
          {tableItems}
          </tbody>
        </table>
      </div>
    )
  };
}

const styles = {
  base: {
    height: 150,
    width: 150,
    margin: 5,
    padding: 5,
    float: 'left',
  },

  table: {
    textAlign: 'left',
    background: 'none',
  },

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