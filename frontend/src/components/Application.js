import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import ExternalLandingPage from '../pages/ExternalLandingPage.js';
import MainPage from '../pages/MainPage.js';

const Application = (logged_in) => {
  return (logged_in === true ?
    <Router history={hashHistory} >
      <Route path="/" component={MainPage} />
    </Router>
    :
    <ExternalLandingPage />
)};

export default Application;