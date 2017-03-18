import React, { Component } from 'react';

export default class HouseholdJoinForm extends Component {
  render() {
    let code;
    return (
      <form id="householdJoinForm" >
        <input type="text" placeholder="Enter household join code" ref={node => {
          code = node
        }} required/>
        <button type="submit" onClick={e => {
          if (!code.value.trim()) {
            return
          }
          this.props.onLogIn(email.value, password.value);
          e.preventDefault();
        }}>Join</button>
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
