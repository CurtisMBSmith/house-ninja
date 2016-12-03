import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import ExternalLandingPage from '../pages/ExternalLandingPage.js';
import MainPage from '../pages/MainPage.js';

class Application extends Component {
  render() {
    if (this.props.isLoggedIn === true) {
      return (<Router history={hashHistory} >
        <Route path="/" component={MainPage} />
      </Router>);
    } else {
      return (<ExternalLandingPage />);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.logged_in
  };
};

const mapDispatchToProps = (dispatch) => {
  return { };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);