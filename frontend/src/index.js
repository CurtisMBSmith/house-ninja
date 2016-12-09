import './styles/styles.scss';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Application from './components/Application';
import app from './reducers';

const loggerMiddleware = createLogger();
let store = createStore(
  app,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  ));

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('content')
);
