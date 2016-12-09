import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogIn, logOut } from '../actions';
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
    logIn: (email, password) => {
      dispatch(doLogIn(userAuth, email));
    },
    onLogOut: () => {
      dispatch(logOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBox);