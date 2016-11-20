import { LOGIN_USER, LOGOUT_USER } from '../constants/actions/LoginActionTypes';

export const logIn = (authToken, email) => {
  return {
    type: LOGIN_USER,
    authToken,
    email
  };
};

export const logOut = (authToken) => {
  return {
    type: LOGOUT_USER,
    authToken
  };
};
