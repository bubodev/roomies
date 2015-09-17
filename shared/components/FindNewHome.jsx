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

    this.props.addUserToHome(this.refs.houseCode.getDOMNode().value, userId).then(res => {
      if(!res.err)
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

    this.props.createHome(homeParams, userId).then(res => {
      if(!res.err)
        this.props.loadUser(userId);
    });
  }

  render() {
    let showComponent;

    if(this.state.selected === "NEW") {
      showComponent = (
        <div>
          <form style={styles.newForm} onSubmit={::this.createNewHouse}>
            <label>House name:</label>
            <input type="text" ref="houseName" placeholder="The cool house" className="form-control" />
            <label>House description:</label>
            <input type="text" ref="houseDesc" placeholder="On the coolest street" className="form-control" />
            <br/>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <button className="btn btn-default" onClick={this.chooseState.bind(this, null)}>Back</button>
        </div>
      )
    } else if(this.state.selected === "EXISTING") {
      showComponent = (
        <div>
          {this.props.home.err && 
            <div className="alert alert-danger">
              {this.props.home.err.data}
            </div>
          }
          <form style={styles.newForm} onSubmit={::this.submitExistingHouse}>
            <label>Existing code: </label>
            <input className="form-control" type="text" ref="houseCode" placeholder="your code here" />
            <br />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <button className="btn btn-default" onClick={this.chooseState.bind(this, null)}>Back</button>
        </div>  
      )
    } else {
      showComponent = (
        <div >
          <h3>What would you like to do?</h3>
          <hr />
          <div style={styles.option} className="well">
            <button className="btn btn-primary" onClick={this.chooseState.bind(this, "NEW")}>Create new home</button>
            <hr />
            Use this option if none of your roommates have created a house yet
          </div>

          <div style={styles.option} className="well">
            <button className="btn btn-primary" onClick={this.chooseState.bind(this, "EXISTING")}>I have a home</button>
            <hr />
            Use this option if you have the house share code
          </div>
        </div>
      )
    }

    return(
      <div>
        <h1>Hello! Welcome to rooomies</h1>
        <div>
          I checked around a bit and it looks like you haven't added a home yet...
          <br />
          Let's fix that now!
        </div>
        <div className="col-sm-6 col-sm-offset-3" style={styles.compContainer}>
          {showComponent}
        </div>
      </div>
    )
  }
}

const styles = {
  compContainer: {
    paddingTop: '15px'
  },

  newForm: {
    paddingBottom: '15px'
  },

  option: {
    color: 'black'
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