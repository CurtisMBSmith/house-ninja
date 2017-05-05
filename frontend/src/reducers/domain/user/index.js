import {
  REGISTER_USER, LOGOUT_USER
} from '../../../constants/action/types/user/LoginActionTypes';

const initialState = {
  currentUser: null
};

const registerUser = (state = initialState, action) => {
  return Object.assign({}, state, {
    currentUser: action.user
  });
};

const logoutUser = (state = initialState) => {
  return Object.assign({}, state, {
    currentUser: null
  });
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return registerUser(state, action);
    case LOGOUT_USER:
      return logoutUser(state);
    default:
      return state;
  }
};

export default user;