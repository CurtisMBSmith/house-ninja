import { combineReducers } from 'redux';
import { auth } from './Auth';

const app = combineReducers({
  auth,
});

export default app;
