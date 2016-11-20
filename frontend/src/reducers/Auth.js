import { LOGIN_USER, LOGOUT_USER } from '../constants/actions/LoginActionTypes';

const initialState = {
  logged_in:false
};

const login = (state = initialState, action) => {
  if (action.type !== LOGIN_USER) {
    return state;
  }

  return Object.assign({}, state, {
    user_auth: action.authToken,
    email: action.email,
    logged_in: true
  });
};

const logout = (state = initialState, action) => {
  if (action.type !== LOGOUT_USER) {
    return state;
  }

  return Object.assign({}, state, {
    user_auth: null,
    logged_in: false
  });
};

const auth = (state = initialState, action) => {
  if (action.type === LOGIN_USER) {
    return login(state, action);
  } else if (action.type === LOGOUT_USER) {
    return logout(state, action);
  }

  return state;
};

export { auth };