import {
  LOGIN_USER, LOGOUT_USER,
  LOGIN_ERR, LOGIN_IN_PROG
} from '../../constants/action/types/user/LoginActionTypes';

export const logOut = () => {
  return {
    type: LOGOUT_USER
  };
};

export const doLogOut = () => {
  return dispatch => {
    var headers = new Headers();

    return fetch('http://localhost:3000/users/destroy', {
      method: 'put',
      credentials: 'same-origin',
      headers
    })
    .then(resp => {
      if (resp.status !== 204) {
        console.log('Logout failed with code ' + resp.status);
        dispatch(logOut());
      } else {
        console.log('Logout successful.');
        dispatch(logOut());
      }
    })
    .catch(err => console.log(err.status + ': ' + err.statusText));
  };
};

export const beginLogin = () => {
  return {
    type: LOGIN_IN_PROG
  };
};

export const loginErr = (err) => {
  return {
    type: LOGIN_ERR,
    login_err: err
  };
};

export const authSuccess = (display_name) => {
  return {
    type: LOGIN_USER,
    display_name
  };
};

export const doLogIn = (email, password) => {
  return dispatch => {
    dispatch(beginLogin());
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var jsonBody = JSON.stringify({});
    if (email && password) {
      jsonBody = JSON.stringify({
        username: email,
        password
      });
    }

    return fetch('http://localhost:3000/users/authenticate', {
      method: 'post',
      credentials: 'same-origin',
      headers,
      body: jsonBody
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.isError) {
        dispatch(loginErr(json.err));
      } else {
        dispatch(authSuccess(json.display_name));
      }
    })
    .catch(err => dispatch(loginErr(err.status + ': ' + err.statusText)));
  };

};

export const getUserDetails = () => {
  return dispatch => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch('http://localhost:3000/users/details', {
      method: 'get',
      credentials: 'same-origin',
      headers
    })
    .then(resp => resp.json())
    .then(json => {
      dispatch(authSuccess(json.display_name));
    })
    .catch(err => console.log('Failed to fetch user details: ' + err));
  };
};