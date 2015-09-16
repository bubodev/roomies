import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as taskActions from '../actions/TaskActions';

import TaskList from '../components/TaskList';
import NewTaskForm from '../components/NewTaskForm';
import Modal from '../components/Modal';
import ColoredButton from '../components/ColoredButton';

class Chores extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showForm: 'show',
    }
  }

  toggleForm(e) {
    let toggled;
    if(this.state.showForm === 'show') {
      toggled = 'hide'
    } else {
      toggled = 'show'
    }
    this.setState({
      showForm: toggled
    })
  }

  componentDidMount() {
    this.props.getTasks();
  }

  debug() {
    debugger;
  }

  render() {
    return(
      <div className="row" style={styles.base}>
        <ColoredButton value="create new task" handleClick={::this.toggleForm} color="primary">
          <span className="fa fa-2x fa-plus"/>
        </ColoredButton>
        <TaskList tasks={this.props.tasks} />
        <Modal color="rgb(240, 128, 128)" show={this.state.showForm} close={::this.toggleForm}>
          <div className="container" style={styles.formContainer}>
            <NewTaskForm />
          </div>
        </Modal>
      </div>
    )
  }
}

var styles = {
  base: {
  },

  formContainer: {
    maxWidth: '900px'
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