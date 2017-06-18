import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogIn, registerUser, showUserSignupForm, showUserLoginForm } from '../../../../actions/user';
import LoginForm from '../../../basic/forms/user/LoginForm';
import SignupForm from '../../../basic/forms/user/SignupForm';
import './LoginSignupPanel.scss';

class LoginSignupPanel extends Component {
  render() {
    return (
      <div id="loginSignupBox" >
        <div className="logInTab">
          <a href="#" onClick={e=> {
            e.preventDefault();
            this.props.showUserLoginForm();
          }} >Log In</a>
        </div>
        <div className="signUpTab">
          <a href="#" onClick={e=> {
            e.preventDefault();
            this.props.showUserSignupForm();
          }} >Sign Up</a>
        </div>
        {this.props.showLoginForm ? <LoginForm onLogIn={this.props.onLogIn} />
            : <SignupForm registerUser={this.props.registerUser} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginInProgress: state.app.user.loginInProg,
    loginErr: state.app.user.loginErr,
    showLoginForm: state.ui.user.showLoginForm
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (email, password) => {
      dispatch(doLogIn(email, password));
    },
    registerUser: (email, password, givenName, surname) => {
      dispatch(registerUser(email, password, givenName, surname));
    },
    showUserLoginForm: () => {
      dispatch(showUserLoginForm());
    },
    showUserSignupForm: () => {
      dispatch(showUserSignupForm());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSignupPanel);