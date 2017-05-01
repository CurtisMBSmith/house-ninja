import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogIn } from '../../../../actions/user';
import LoginForm from '../../../basic/forms/user/LoginForm';

class LoginSignupPanel extends Component {
  render() {
    return (
      <div className="loginBox" >
        <LoginForm onLogIn={this.props.onLogIn} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginInProgress: state.app.user.loginInProg,
    loginErr: state.app.user.loginErr
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (email, password) => {
      dispatch(doLogIn(email, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSignupPanel);