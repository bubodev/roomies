import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as taskActions from '../actions/TaskActions';

import TaskList from '../components/TaskList';
import NewTaskForm from '../components/NewTaskForm';
import Modal from '../components/Modal';
import ColoredButton from '../components/ColoredButton';

import { layout } from './styles';

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
      this.context.router.transitionTo('/home/dashboard');
    }
  }

  render() {
    return(
      <div style={layout.base}>
        <div className="title">
          Chores
        </div>
        <div key='chores' className="mainContent">
          <div className="base-container scroll">
            <button onClick={::this.toggleForm} className="btn btn-primary btn-sm">
              <span className="fa fa-plus"/> new chore
            </button>
            <div style={styles.taskListContainer}>
              <TaskList users={this.props.users} tasks={this.props.tasks} />
            </div>
          </div>
        </div>
        <Modal color="rgba(0, 0, 0, 0.9)" show={this.state.showForm} close={::this.toggleForm}>
          <div className="container" style={styles.formContainer}>
            <NewTaskForm closeModal={::this.toggleForm} rendered={this.state.showForm} homeId={this.props.homeId}/>
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
  tasks: state.tasks.get('collection'),
  homeId: state.auth.user && state.auth.user.homeId,
  users: state.home.home && state.home.home.users
}))

export default
class ChoresContainer {
  static propTypes = {
    tasks: PropTypes.object,
    users: PropTypes.array,
    homeId: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { tasks, dispatch, homeId, users } = this.props;
    return <Chores tasks={tasks} users={users} homeId={homeId} {...bindActionCreators(taskActions, dispatch)} />;
  }
}