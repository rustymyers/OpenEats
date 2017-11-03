import AppDispatcher from '../../common/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import { EventEmitter } from 'events';
import history from '../../common/history'

const CHANGE_EVENT = 'change';

var _errors = '';

function setUser(user) {
  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

function removeUser() {
  localStorage.removeItem('user');
}

class AuthStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  isAuthenticated() {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }

  getToken() {
    const user = this.getUser();
    return user.token;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getErrors() {
    return _errors;
  }
}

const AuthStore = new AuthStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
AuthStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case AuthConstants.LOGIN_USER:
      setUser(action.user);
      AuthStore.emitChange();
      history.push('/');
      break;

    case AuthConstants.LOGIN_ERROR:
      _errors = action.error;
      AuthStore.emitChange();
      break;

    case AuthConstants.LOGOUT_USER:
      removeUser();
      AuthStore.emitChange();
      history.push('/');
      break;

    default:
  }


});

export default AuthStore;
