import {
  LOGIN_ERR, LOGIN_IN_PROG, LOGIN_DONE,
  REGISTER_START, REGISTER_DONE, REGISTER_ERR
} from '../../../constants/action/types/user/LoginActionTypes';

const initialState = {
  loginInProg: false,
  loginErr: null,
  registerInProg: false,
  registerErr: null
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

const registerStart = (state = initialState) => {
  return Object.assign({}, state, {
    registerInProg: true,
    registerErr: null
  });
};

const registerError = (state = initialState, action) => {
  return Object.assign({}, state, {
    registerErr: action.err
  });
};

const registerDone = (state = initialState) => {
  return Object.assign({}, state, {
    registerInProg: false
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
    case REGISTER_START:
      return registerStart(state);
    case REGISTER_ERR:
      return registerError(state, action);
    case REGISTER_DONE:
      return registerDone(state, action);
    default:
      return state;
  }
};

export default user;