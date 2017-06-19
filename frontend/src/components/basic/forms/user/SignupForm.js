import React, { Component } from 'react';

export default class SignupForm extends Component {
  render() {
    let email, password, password2, givenName, surname;
    return (
      <form className="signupForm" >
        <input type="email" placeholder="Enter email address" ref={node => {
          email = node
        }} required/>
        <input type="password" placeholder="Enter password" ref={node => {
          password = node
        }} required/>
        <input type="password" placeholder="Repeat password" ref={node => {
          password2 = node
        }} required/>
        <input type="text" placeholder="Enter given name" ref={node => {
          givenName = node
        }} required/>
        <input type="text" placeholder="Enter surname" ref={node => {
          surname = node
        }} required/>
        <p className="createUserStatus">{this.statusText()}</p>
        <div className="formButtons">
          <button type="submit" onClick={e => {
            // Clear custom validity so that validation can proceed
            // if errors have been fixed.
            password.setCustomValidity('');
            if (!this.validateForm(email, password, password2, givenName, surname)) {
              return
            }

            if (password.value !== password2.value) {
              password.setCustomValidity('Passwords must match');
              return;
            }
            this.props.registerUser(email.value, password.value, givenName.value, surname.value);
            e.preventDefault();
          }}>Sign Up</button>
        </div>
     </form>
    );
  };

  validateForm(email, password1, password2, givenName, surname) {
    return this.validateInput(email, false) && this.validateInput(password1, false)
      && this.validateInput(givenName, false) && this.validateInput(surname, false);
  };

  validateInput(formNode, emptyValid) {
    return formNode.validity.valid && (!emptyValid && formNode.value.trim().length !== 0);
  };

  statusText() {
    if (this.props.createInProgress === true) {
      return 'Registering...';
    } else if (this.props.loginErr) {
      return this.props.loginErr;
    }

    return '';
  }
}
