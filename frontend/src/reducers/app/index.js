import { combineReducers } from 'redux';
import user from './user/';
import household from './household/';

const app = combineReducers({
  user,
  household,
});

export default app;
