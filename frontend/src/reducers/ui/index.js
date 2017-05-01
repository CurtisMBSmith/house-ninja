import { combineReducers } from 'redux';
import meal from './meal/';
import household from './household/';

const ui = combineReducers({
  household,
  meal
});

export default ui;
