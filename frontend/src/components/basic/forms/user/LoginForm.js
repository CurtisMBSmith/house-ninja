import React, { Component } from 'react';
import './LoginForm.scss';

export default class LoginForm extends Component {
  render() {
    let email, password;
    return (
      <form className="loginForm" >
        <input type="email" placeholder="Enter email address" ref={node => {
          email = node
        }} required/>
        <input type="password" placeholder="Enter password" ref={node => {
          password = node
        }} required/>
        <p className="loginStatus">{this.statusText()}</p>
        <div className="formButtons">
          <button type="submit" onClick={e => {
            if (!email.value.trim()) {
              return;
            }
            if (!email.validity.valid || !password.validity.valid) {
              return;
            }
            this.props.onLogIn(email.value, password.value);
            e.preventDefault();
          }}>Log In</button>
          <button type="button" >Forgot Password?</button>
        </div>
     </form>
    );
  };

  statusText() {
    if (this.props.loginInProgress === true) {
      return 'Logging in...';
    } else if (this.props.loginErr) {
      return this.props.loginErr;
    }

    return '';
  }
}
