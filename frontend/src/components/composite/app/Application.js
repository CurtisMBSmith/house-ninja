import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import ExternalLandingPage from '../pages/ExternalLandingPage.js';
import MainPage from '../pages/MainPage.js';
import PlannerPage from '../pages/PlannerPage';

class Application extends Component {
  render() {
    if (this.props.isLoggedIn === true) {
      return (<Router history={hashHistory} >
        <Route path="/" component={MainPage} />
        <Route path="/plan/" component={PlannerPage} />
      </Router>);
    } else {
      return (<ExternalLandingPage />);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.domain.user.currentUser !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return { };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);