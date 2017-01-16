import React, { Component, PropTypes } from 'react';

class UserPanel extends Component {
  render() {
    return (
      <div id="userPanel">
        <p id="welcomeMsg">Welcome, {this.props.displayName}!</p>
        <a href="#" onClick={e => {
          e.preventDefault();
          this.props.onLogOut();
        }}>Logout</a>
      </div>
    );
  }
}

UserPanel.propTypes = {
  displayName: PropTypes.string.isRequired,
  onLogOut: PropTypes.func.isRequired
}

export default UserPanel;