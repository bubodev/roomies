import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

import * as HomeActions from '../actions/HomeActions';
import * as AuthActions from '../actions/AuthActions';

class FindNewHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  chooseState(choice) {
    this.setState({
      selected: choice
    })
  }

  submitExistingHouse(e) {
    e.preventDefault();

    let userId = cookie.load('userId').slice(3,-1);

    this.props.addUserToHome(this.refs.houseCode.getDOMNode().value, userId).then(home => {
      this.props.loadUser(userId);
    })
  }

  createNewHouse(e) {
    e.preventDefault();
    let homeParams = {
      name: this.refs.houseName.getDOMNode().value,
      description: this.refs.houseDesc.getDOMNode().value,
    }

    let userId = cookie.load('userId').slice(3,-1);

    this.props.createHome(homeParams, userId).then(home => {
      this.props.loadUser(userId);
    });
  }

  render() {
    let showComponent;

    if(this.state.selected === "NEW") {
      showComponent = (
        <div>
          <form onSubmit={::this.createNewHouse}>
            <input type="text" ref="houseName" placeholder="House name" className="form-control" />
            <input type="text" ref="houseDesc" placeholder="House description" className="form-control" />
            <input type="submit" className="form-control" />
          </form>
          <button onClick={this.chooseState.bind(this, null)}>Back</button>
        </div>
      )
    } else if(this.state.selected === "EXISTING") {
      showComponent = (
        <div>
          <form onSubmit={::this.submitExistingHouse}>
            <input type="text" ref="houseCode" placeholder="enter house code" />
          </form>
          <button onClick={this.chooseState.bind(this, null)}>Back</button>
        </div>  
      )
    } else {
      showComponent = (
        <div>
          <button onClick={this.chooseState.bind(this, "NEW")}>Create new home</button>
          <button onClick={this.chooseState.bind(this, "EXISTING")}>I have a home</button>
        </div>
      )
    }


    return(
      <div>
        {this.state.selected}
        {showComponent}
      </div>
    )
  }
}

@connect(state => ({
  home: state.home,
  auth: state.auth,
}))

export default class FindNewHomeContainer {
  static propTypes = {
    home: PropTypes.object,
    auth: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { home, auth, dispatch } = this.props;
    return <FindNewHome auth={auth} home={home} {...bindActionCreators(AuthActions, dispatch)} {...bindActionCreators(HomeActions, dispatch)}/>
  }
}