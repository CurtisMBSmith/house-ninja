import {
  LOGIN_USER, LOGOUT_USER,
  LOGIN_ERR, LOGIN_IN_PROG
} from '../constants/actions/LoginActionTypes';

// function fetchPosts(subreddit) {
//   return dispatch => {
//     dispatch(requestPosts(subreddit))
//     return fetch(`http://www.reddit.com/r/${subreddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(subreddit, json)))
//   }
// }

export const logOut = () => {
  return {
    type: LOGOUT_USER
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

export const authSuccess = (authToken, email) => {
  return {
    type: LOGIN_USER,
    authToken,
    email
  };
};

export const doLogIn = (email, password) => {
  return dispatch => {
    dispatch(beginLogin());
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return fetch('http://localhost:3000/users/authenticate', {
      method: 'post',
      headers,
      body: JSON.stringify({
        username: email,
        password
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.isError) {
        dispatch(loginErr(json.err));
      } else {
        dispatch(authSuccess(json.id_token, email));
      }
    })
    .catch(err => dispatch(loginErr(err.status + ': ' + err.statusText)));
  };

};
