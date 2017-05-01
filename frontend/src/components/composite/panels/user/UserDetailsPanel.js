import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogIn, doLogOut } from '../../../../actions/user/';
import UserDetails from '../../../basic/containers/user/UserDetails';
import './UserDetailsPanel.scss';

class UserDetailsPanel extends Component {
  render() {
    return (
      <div className="userBox">
        <UserDetails displayName={this.userDisplayName()}
          onLogOut={this.props.onLogOut} />
      </div>
    );
  }

  userDisplayName() {
    return this.props.user.givenName + ' ' + this.props.user.surname;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.domain.user.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => {
      dispatch(doLogOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailsPanel);