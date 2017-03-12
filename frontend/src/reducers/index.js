import { combineReducers } from 'redux';
import { auth } from './user/Auth';
import { household } from './household/Household';

const app = combineReducers({
  auth,
  household
});

export default app;
