import {
  REGISTER_USER, LOGOUT_USER,
  LOGIN_ERR, LOGIN_IN_PROG, LOGIN_DONE,
  REGISTER_START, REGISTER_DONE, REGISTER_ERR,
  SHOW_USER_SIGNUP_FORM, SHOW_USER_LOGIN_FORM
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
    loginErr: err
  };
};

export const loginDone = () => {
  return {
    type: LOGIN_DONE
  };
};

export const authSuccess = (user) => {
  return {
    type: REGISTER_USER,
    user
  };
};

export const regsterStart = () => {
  return {
    type: REGISTER_START
  };
};

export const registerDone = () => {
  return {
    type: REGISTER_DONE
  };
};

export const registerErr = (err) => {
  return {
    type: REGISTER_ERR,
    err
  };
};

export const showUserSignupForm = () => {
  return {
    type: SHOW_USER_SIGNUP_FORM
  };
};

export const showUserLoginForm = () => {
  return {
    type: SHOW_USER_LOGIN_FORM
  };
};

export const doLogIn = (email, password) => {
  return dispatch => {
    dispatch(beginLogin());
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
//    headers.append('Content-Type', 'application/json');

    var jsonBody = JSON.stringify({});
    if (email && password) {
      jsonBody = JSON.stringify({
        username: email,
        password
      });
    }

//    var formData = new FormData();
//    formData.append('username', email);
//    formData.append('password', password);
    var formData = 'username=' + email +'&password=' + password;
//    console.log(formData);

    return fetch('http://localhost:3000/', {
      method: 'post',
      credentials: 'same-origin',
      headers,
      body: formData //jsonBody //formData
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.isError) {
        dispatch(loginErr(json.err));
      } else {
        dispatch(authSuccess(json));
      }
      dispatch(loginDone());
    })
    .catch(err => {
      dispatch(loginErr(err.status + ': ' + err.statusText));
      dispatch(loginDone());
    });
  };

};

export const registerUser = (email, password, givenname, surname) => {
  return dispatch => {
    dispatch(regsterStart());
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var jsonBody = JSON.stringify({
      email,
      password,
      givenname,
      surname
    });

    return fetch('http://localhost:3000/user/create', {
      method: 'post',
      credentials: 'same-origin',
      headers,
      body: jsonBody
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.isError) {
        dispatch(registerErr(json.err));
      } else {
        dispatch(authSuccess(json));
      }
      dispatch(registerDone());
    })
    .catch(err => {
      dispatch(registerErr(err.status + ': ' + err.statusText));
      dispatch(registerDone());
    });
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
      dispatch(authSuccess(json));
      dispatch(loginDone());
    })
    .catch(err => console.log('Failed to fetch user details: ' + err));
  };
};
