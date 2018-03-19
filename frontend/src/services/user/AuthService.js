import request from 'reqwest';
import when from 'when';

class AuthService {
  login(username, password) {
    return when(request({
      url: 'http://localhost:3000/api/users/authenticate',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        username, password
      }
    }))
    .then(function(resp) {
      //let jwt = resp.id_token;
      // LoginActions.loginUser(jwt);

      return true;
    });
  }
}

export default new AuthService();
