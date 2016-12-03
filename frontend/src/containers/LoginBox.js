import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions';
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
  return { };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (userAuth, email, callback) => {
      callback();
      dispatch(logIn(userAuth, email));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBox);