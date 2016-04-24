import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';
import AuthSvc from '../services/AuthService.jsx';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      password: ''
    };
  }

  login(e) {
    e.preventDefault();
    AuthSvc.login(this.state.user, this.state.password)
      .catch(function(err) {
        alert('An error occurred while logging in.');
        console.log('Login error: ' + err.response, err);

      });
  }

  render() {
    return (
      <div className="login jumbotron center-block" >
        <h1>Login</h1>
        <form role="form" >
          <div className="form-group" >
            <label htmlFor="username">Username</label>
            <input type="email" valueLink={this.linkState('user')} className="form-control" id="username" placeholder="E-mail Address" />
          </div>
          <div className="form-group" >
            <label htmlFor="password">Password</label>
            <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Login</button>
        </form>
      </div>
    );
  }
}

ReactMixin(Login.prototype, LinkedStateMixin);