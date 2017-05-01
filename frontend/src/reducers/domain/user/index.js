import {
  REGISTER_USER
} from '../../../constants/action/types/user/LoginActionTypes';

const initialState = {
  currentUser: null
};

const registerUser = (state = initialState, action) => {
  return Object.assign({}, state, {
    currentUser: action.user
  });
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return registerUser(state, action);
    default:
      return state;
  }
};

export default user;