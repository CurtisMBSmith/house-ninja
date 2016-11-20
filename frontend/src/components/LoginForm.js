import React, { Component } from 'react';

export default class LoginForm extends Component {
  render() {
    let email, password;
    return (
      <form className="loginForm" >
        <input type="email" placeholder="Enter email address" ref={node => {
          email = node
        }} required/>
        <input type="password" placeholder="hunter2" ref={node => {
          password = node
        }} required/>
        <button type="submit" onClick={e => {
          if (!email.value.trim()) {
            return
          }
          if (!email.validity.valid || !password.validity.valid) {
            return;
          }
          this.props.onLogIn("authToken", email.value);
          e.preventDefault();
        }}>Log In</button>
        <button type="button" >Forgot Password?</button>

     </form>
    );
  };

}
