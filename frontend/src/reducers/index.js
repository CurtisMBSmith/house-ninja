import { combineReducers } from 'redux';
import { auth } from './Auth';
import { household } from './Household';

const app = combineReducers({
  auth,
});

export default app;
