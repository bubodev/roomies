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
      showForm: 'hide',
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
    if(!this.props.homeId){
      this.context.router.transitionTo('/home');
    }
    this.props.homeId && this.props.getTasks(this.props.homeId);
  }

  render() {
    return(
      <div>
        <div className="header">
          <h1> Chores </h1>
          <button onClick={::this.toggleForm} className="btn btn-primary btn-sm">
            <span className="fa fa-plus"/> new chore
          </button>
        </div>
        <div style={styles.taskListContainer}>
          <TaskList tasks={this.props.tasks} />
        </div>
        <Modal color="rgba(240, 128, 128, 0.9)" show={this.state.showForm} close={::this.toggleForm}>
          <div className="container" style={styles.formContainer}>
            <NewTaskForm rendered={this.state.showForm} homeId={this.props.homeId}/>
          </div>
        </Modal>
      </div>
    )
  }
}

Chores.contextTypes = {
  router: React.PropTypes.object.isRequired
}

var styles = {
  formContainer: {
    maxWidth: 900
  },

  newTaskButtonContainer: {
    maxWidth: 150
  },

  taskListContainer: {
    padding: 15
  }
}

@connect(state => ({
  tasks: state.tasks,
  homeId: state.auth.user && state.auth.user.homeId
}))

export default
class ChoresContainer {
  static propTypes = {
    tasks: PropTypes.object,
    homeId: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { tasks, dispatch, homeId } = this.props;
    return <Chores tasks={tasks} homeId={homeId} {...bindActionCreators(taskActions, dispatch)} />;
  }
}