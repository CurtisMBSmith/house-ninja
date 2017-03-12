import React, { Component, PropTypes } from 'react';

export default class CreateJoinPanel extends Component {
  render() {
    let name, location;

    if (this.props.showHouseholdCreateForm) {
      return (
        <div className="pageHeader">
          <HouseholdBanner displayName={this.props.household.name}
            householdId={this.props.household.id} />
          <UserBox displayName={this.props.userDisplayName}
            onLogOut={this.props.onLogOut} />
        </div>
      );
    } else {
      return (
        <div className="pageHeader">
          <UserBox displayName={this.props.userDisplayName}
            onLogOut={this.props.onLogOut} />
        </div>
      );
    }

    return (
      <form className="householdForm" >
        <input type="text" placeholder="Enter household name" ref={node => {
          name = node
        }} required/>
        <input type="location" placeholder="hunter2" ref={node => {
          location = node
        }} required/>
        <button type="submit" onClick={e => {
          if (!name.value.trim() || !location.value.trim()) {
            return
          }
          this.props.createHousehold(name.value, location.value);
          e.preventDefault();
        }}>Log In</button>
        <button type="button" >Forgot Password?</button>
        <p className="loginStatus">{this.statusText()}</p>
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
