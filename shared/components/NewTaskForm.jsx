import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as taskActions from '../actions/TaskActions';

@Radium
class NewTaskForm extends Component {

  createTask(e) {
    e.preventDefault();
    let taskName = this.refs.taskName.getDOMNode();
    let startDate = this.refs.startDate.getDOMNode();
    let endDate = this.refs.endDate.getDOMNode();

    this.props.createTask({
      taskName: taskName.value,
      startDate: startDate.value,
      endDate: endDate.value,
      completed: false
    });

    taskName.value = "";
    startDate.value = "";
    endDate.value = "";
  }

  render() {
    return(
      <form onSubmit={::this.createTask} className="form">
        <label for="taskName">Enter a task</label>
        <input className="form-control" type='text' placeholder="Washing the dishes, clean the bathroom..." ref="taskName" id="taskName"/>
        <label for="startDate">Start Date</label>
        <input className="form-control" type='date' placeholder="this is a test" id="startDate" ref="startDate"/>
        <label for="endDate">End Date</label>
        <input className="form-control" type='date' placeholder="this is a test" id="endDate" ref="endDate"/>
        <input onSubmit={::this.createTask} type="submit"/>
      </form>
    )
  }
}

@connect(state => ({
  tasks: state.tasks
}))

export default
class NewTaskFormContainer {
  static propTypes = {
    tasks: PropTypes.object,
  }

  render() {
    const { tasks, dispatch } = this.props;
    return <NewTaskForm tasks={tasks} {...bindActionCreators(taskActions, dispatch)} />;
  }
}