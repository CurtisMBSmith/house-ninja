import { LOGIN_USER, LOGOUT_USER } from '../constants/actions/LoginActionTypes.jsx';

const login = (state, action) => {
  if (action.type !== LOGIN_USER) {
    return state;
  }

  return Object.assign({}, state, {
    user_auth: action.auth
  });
};

const logout = (state, action) => {
  if (action.type !== LOGOUT_USER) {
    return state;
  }

  return Object.assign({}, state, {
    user_auth: null
  });
};

export { login, logout };