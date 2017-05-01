import {
  SHOW_USER_SIGNUP_FORM,
  SHOW_USER_LOGIN_FORM,
} from '../../../constants/action/types/user/LoginActionTypes';

const initialState = {
  showLoginForm: true,
};

const toggleLoginForm = (state = initialState, showForm = true) => {
  return Object.assign({}, state, {
    showLoginForm: showForm
  });
};

const household = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_USER_LOGIN_FORM:
      return toggleLoginForm(state, true);
    case SHOW_USER_SIGNUP_FORM:
      return toggleLoginForm(state, false);
    default:
      return state;
  }
};

export default household;