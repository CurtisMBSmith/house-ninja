import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogIn, doLogOut } from '../../../../actions/user/';
import UserDetails from '../../../basic/containers/user/UserDetails';
import './UserDetailsPanel.scss';

class UserDetailsPanel extends Component {
  render() {
    return (
      <div className="userBox">
        <UserDetails displayName={this.props.displayName}
          onLogOut={this.props.onLogOut} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.logged_in,
    userAuth: state.auth.user_auth,
    displayName: state.auth.display_name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (email, password) => {
      dispatch(doLogIn(userAuth, email));
    },
    onLogOut: () => {
      dispatch(doLogOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailsPanel);