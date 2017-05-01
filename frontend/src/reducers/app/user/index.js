import {
  LOGIN_ERR, LOGIN_IN_PROG, LOGIN_DONE
} from '../../../constants/action/types/user/LoginActionTypes';

const initialState = {
  loginInProg: false,
  loginErr: null,
};

const loginStart = (state = initialState) => {
  return Object.assign({}, state, {
    loginInProg: true,
    loginErr: null
  });
};

const loginError = (state = initialState, action) => {
  return Object.assign({}, state, {
    loginErr: action.loginErr
  });
};

const loginDone = (state = initialState) => {
  return Object.assign({}, state, {
    loginInProg: false
  });
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_IN_PROG:
      return loginStart(state);
    case LOGIN_ERR:
      return loginError(state, action);
    case LOGIN_DONE:
      return loginDone(state, action);
    default:
      return state;
  }
};

export default user;