import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/AuthActions';
import SideBar from '../components/SideBar';  
import Dashboard from './Dashboard';
import cookie from 'react-cookie';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let userId = cookie.load('userId')
    userId && this.props.loadUser(userId.slice(3,-1));
  }

  render() {
    return(
      <div className="container-fluid" style={styles.base}>
        <div className="col-sm-3">
          <SideBar />
        </div>
        <div className="col-sm-9">
          {this.props.children || <Dashboard/>}
        </div>
      </div>
    )
  }
}

var styles = {
  base: {
    paddingTop: '65px',
    backgroundColor: 'gainsboro'
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
    const { auth, children, dispatch } = this.props;
    return <Home auth={auth} children={children} {...bindActionCreators(authActions, dispatch)} />;
  }
}