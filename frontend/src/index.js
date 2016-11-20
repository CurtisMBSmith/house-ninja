import './styles/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Application from './components/Application';
import app from './reducers';

let store = createStore(app);

render(
  <Provider store={store}>
    <Application history={hashHistory} />
  </Provider>,
  document.getElementById('content')
);
