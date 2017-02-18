import {
  HOUSEHOLD_CREATE_START,
  HOUSEHOLD_CREATE_ERR,
  HOUSEHOLD_REGISTER,
  HOUSEHOLD_CREATE_SHOW_FORM
} from '../constants/actions/HouseholdActionTypes';

const initialState = {
  householdCreateInProg: false,
  household: null,
  householdCreateErr: null,
};

const login = (state = initialState, action) => {
  if (action.type !== LOGIN_USER) {
    return state;
  }

  return Object.assign({}, state, {
    display_name: action.display_name,
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

const household = (state = initialState, action) => {
  switch (action.type) {
    case HOUSEHOLD_CREATE_START:
      return householdCreateStart(state, action);
    case HOUSEHOLD_CREATE_ERR:
      return logout(state, action);
    case HOUSEHOLD_REGISTER:
      return beginLogin(state, action);
    case HOUSEHOLD_CREATE_SHOW_FORM:
      return errorInLogin(state, action);
    default:
      return state;
  }
};

export { household };