import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/AuthActions';
import * as taskActions from '../actions/TaskActions';

import Sidebar from '../components/Sidebar';
import NewTaskForm from '../components/NewTaskForm'

class Home extends Component {

  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    return(
      <div className="container-fluid" style={styles.base}>
        <div className="row">
          <NewTaskForm />
          <Sidebar key="sideBar" tasks={this.props.tasks} />
          <div style={styles.mainSection} className="col-sm-9">
          </div>
        </div>
      </div>
    )
  }
}

var styles = {
  base: {
    paddingTop: '65px',
    backgroundColor: 'lightgrey'
  },

  mainSection: {
  },
}

@connect(state => ({
  auth: state.auth,
  tasks: state.tasks
}))

export default 
class HomeContainer {
  static propTypes = {
    auth: PropTypes.object,
    tasks: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { auth, tasks, dispatch } = this.props;
    return <Home auth={auth} tasks={tasks} {...bindActionCreators(taskActions, dispatch)} {...bindActionCreators(authActions, dispatch)} />;
  }
}