import './styles/styles.scss';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { getUserDetails } from './actions/user';
import Application from './components/composite/app/Application';
import store from './reducers';

const loggerMiddleware = createLogger();
let appStore = createStore(
  store,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  ));

// Dispatch an empty login request to pull user information
// from the current session if one exists
appStore.dispatch(getUserDetails());

render(
  <Provider store={appStore}>
    <Application />
  </Provider>,
  document.getElementById('content')
);
