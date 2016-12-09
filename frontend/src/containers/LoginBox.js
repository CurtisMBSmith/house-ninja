import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogIn } from '../actions';
import LoginForm from '../components/LoginForm';

class LoginBox extends Component {
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
    loginInProgress: state.auth.login_in_prog,
    loginErr: state.auth.login_err
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
)(LoginBox);