import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return(
      <div>
        <h1>LOGIN PAGE</h1>
        <a href="/auth/google"> 
          Click here to login with google 
        </a>
      </div>
    )
  }
}