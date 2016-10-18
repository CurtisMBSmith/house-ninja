// import AppDispatcher from '../dispatchers/AppDispatcher.jsx';
import { LOGIN_USER, LOGOUT_USER } from '../constants/actions/LoginActionTypes.jsx';

export default {
  login: function(jwt) {
    var savedJwt = localStorage.getItem('jwt');

    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt
    });

    if (savedJwt !== jwt) {
      localStorage.setItem('jwt', jwt);
    }
  },
  logout: function() {
    localStorage.removeItem('jwt');
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }

};