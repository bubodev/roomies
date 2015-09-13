import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as taskActions from '../actions/TaskActions';
import RadioButtons from './RadioButtons';


@Radium
class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] }
  }

  createTask(e) {
    e.preventDefault();
    let taskName = this.refs.taskName.getDOMNode();
    let startDate = this.refs.startDate.getDOMNode();
    let endDate = this.refs.endDate.getDOMNode();

    let errors = [];
    if(!taskName.value.length)
      errors.push('Must input a task name!');
    if(!startDate.value.length)
      errors.push('Must input a start date!');

    if(errors.length){
      this.setState({
        errors: errors
      })
      return;
    }
   
    this.props.createTask({
      taskName: taskName.value,
      startDate: startDate.value,
      endDate: endDate.value,
      completed: false
    });

    taskName.value = "";
    startDate.value = "";
    endDate.value = "";
    this.setState({errors: []})
  }

  render() {
    let errorList = this.state.errors.map(function(err) {
      return <li>{err}</li>
    })

    return(
      <form onSubmit={::this.createTask} className="form">
        <ul className="errors">
          {errorList}
        </ul>
        <label htmlFor="taskName">Enter a task</label>
        <input className="form-control" type='text' placeholder="Washing the dishes, clean the bathroom..." ref="taskName" id="taskName"/>
        <label htmlFor="startDate">Start Date</label>
        <input className="form-control" type='date' placeholder="this is a test" id="startDate" ref="startDate"/>
        <label htmlFor="repeat">Repeats</label>
        <RadioButtons values={[1,2,3,4,5]} />

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