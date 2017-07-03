import { request } from '../../common/CustomSuperagent';
import AppDispatcher from '../../common/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import {serverURLs} from '../../common/config'

export default {
  getToken: function(username, pass) {
    var url = serverURLs.auth_token;
    request
      .post(url)
      .send({'username': username, 'password': pass})
      .end((err, res) => {
        if (!err && res) {
          this.logUserIn(res.body);
        } else {
          this.logInError({error: true});
          console.error(url, err.toString());
        }
      })
  },

  logUserIn: (user) => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_USER,
      user: user
    });
  },

  logInError: (error) => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_ERROR,
      error: error
    });
  },

  logUserOut: () => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_USER
    });
  },
}
