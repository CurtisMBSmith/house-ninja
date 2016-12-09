import {
  LOGIN_USER, LOGOUT_USER,
  LOGIN_ERR, LOGIN_IN_PROG
} from '../constants/actions/LoginActionTypes';

const initialState = {
  logged_in:false,
  login_in_prog: false,
  login_err: null
};

const login = (state = initialState, action) => {
  if (action.type !== LOGIN_USER) {
    return state;
  }

  return Object.assign({}, state, {
    user_auth: action.authToken,
    email: action.email,
    logged_in: true,
    login_in_prog: false
  });
};

const logout = (state = initialState, action) => {
  if (action.type !== LOGOUT_USER) {
    return state;
  }

  return Object.assign({}, state, {
    user_auth: null,
    logged_in: false,
    login_in_prog: false
  });
};

const beginLogin = (state = initialState, action) => {
  if (action.type !== LOGIN_IN_PROG) {
    return state;
  }

  return Object.assign({}, state, {
    login_in_prog: true,
    login_err: null
  });
};

const errorInLogin = (state = initialState, action) => {
  if (action.type !== LOGIN_ERR) {
    return state;
  }

  return Object.assign({}, state, {
    login_in_prog: false,
    login_err: action.login_err
  });
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return login(state, action);
    case LOGOUT_USER:
      return logout(state, action);
    case LOGIN_IN_PROG:
      return beginLogin(state, action);
    case LOGIN_ERR:
      return errorInLogin(state, action);
    default:
      return state;
  }
};

export { auth };