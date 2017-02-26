import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogIn, doLogOut } from '../actions';
import UserPanel from '../components/UserPanel';
import LoginForm from '../components/LoginForm';
import '../styles/components/UserBox.scss';

class UserBox extends Component {
  render() {
    return (
      <div className="userBox">
        <UserPanel displayName={this.props.displayName}
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
)(UserBox);