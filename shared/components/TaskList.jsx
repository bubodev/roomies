import React from 'react';
import Radium from 'radium';

const accentColor = '#00DFFF';

export default class TaskList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let tableItems;

    if(this.props.tasks && this.props.users){
      tableItems = this.props.tasks.map((task) => {
        const { users } = this.props;
        let name;
        users.forEach(function(user) {
          if(user._id === task.currentUser) {
            name = user.name;
          }
        })

        let completeBy, lastCompleted;

        if(task.lastCompleted) {
          completeBy = new Date(task.lastCompleted);
          lastCompleted = task.lastCompleted.replace(/T/, ' ').replace(/\..+/, '').slice(0,10)
        } else {
          completeBy = new Date(task.startDate);
          lastCompleted = "never"
        }
        completeBy.setDate(completeBy.getDate() + task.frequency);


        return (
          <tr key={task._id}>
            <td>{ task.name }</td>
            <td>{ task.description.join(', ') }</td>
            <td>{ name }</td>
            <td>{ lastCompleted }</td>
            <td>{ completeBy.toJSON().slice(0,10) } </td>
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
            <th>Assigned to</th>
            <th>Last Completed</th>
            <th>Due by</th>
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