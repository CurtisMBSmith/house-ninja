import { combineReducers } from 'redux';
import { login, logout } from './Login.jsx';

const app = combineReducers({
  login,
  logout
});

export default app;
