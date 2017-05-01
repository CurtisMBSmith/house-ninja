import { combineReducers } from 'redux';
import meal from './meal/';
import household from './household/';
import user from './user/';

const ui = combineReducers({
  household,
  meal,
  user
});

export default ui;
