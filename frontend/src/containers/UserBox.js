import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn, logOut } from '../actions';
import UserPanel from '../components/UserPanel';
import LoginForm from '../components/LoginForm';

class UserBox extends Component {
  render() {
    return (
      <div className="userBox" >
        { this.props.isLoggedIn ? <UserPanel email={this.props.email} onLogOut={this.props.onLogOut} />
          : <LoginForm onLogIn={this.props.onLogIn} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.logged_in,
    userAuth: state.auth.user_auth,
    email: state.auth.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (userAuth, email) => {
      dispatch(logIn(userAuth, email));
    },
    onLogOut: (userAuth) => {
      dispatch(logOut(userAuth));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBox);