import { combineReducers } from 'redux';
import app from './app/';
import domain from './domain/';
import ui from './ui/';

const store = combineReducers({
  app,
  domain,
  ui
});

export default store;
