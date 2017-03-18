import React, { Component } from 'react';

export default class HouseholdCreateForm extends Component {
  render() {
    let name;
    return (
      <form className="householdCreateForm" >
        <input type="text" placeholder="Enter household name" ref={node => {
          name = node
        }} required/>
        <button type="submit" onClick={e => {
          if (!name.value.trim()) {
            return
          }
          this.props.onLogIn(email.value, password.value);
          e.preventDefault();
        }}>Create</button>
        <p className="formStatus">{this.statusText()}</p>
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
