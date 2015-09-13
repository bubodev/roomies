import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as taskActions from '../actions/TaskActions';

import TaskList from '../components/TaskList';
import NewTaskForm from '../components/NewTaskForm';

class Chores extends Component {
  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    return(
      <div className="row" style={styles.base}>
        <TaskList key="sideBar" tasks={this.props.tasks} />
        <div style={styles.mainSection} className="col-sm-9">
        <NewTaskForm/>
        </div>
      </div>
    )
  }
}

var styles = {
  base: {
  }
}

@connect(state => ({
  tasks: state.tasks
}))

export default
class ChoresContainer {
  static propTypes = {
    tasks: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { tasks, dispatch } = this.props;
    return <Chores tasks={tasks} {...bindActionCreators(taskActions, dispatch)} />;
  }
}