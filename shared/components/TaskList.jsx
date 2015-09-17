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
          </tr>
        )
      })
    }
    
    return (
      <div className="col-sm-12 panel panel-default" style={styles.sideBar}>
        <div className="panel-heading">house chore list</div>
        <table className="table" style={styles.table}>
          <tr>
            <th>Chore</th>
            <th>Description</th>
            <th>Frequency</th>
          </tr>
          {tableItems}
        </table>
      </div>
    )
  };
}

var styles = {
  base: {
    height: 150,
    width: 150,
    background: 'lightgrey',
    margin: 5,
    padding: 5,
    float: 'left',
  },

  table: {
    textAlign: 'left'
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