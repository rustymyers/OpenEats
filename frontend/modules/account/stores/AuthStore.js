import AppDispatcher from '../../common/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import { EventEmitter } from 'events';
import { browserHistory } from 'react-router'

const CHANGE_EVENT = 'change';

var _errors = '';

function setUser(token) {
  if (!localStorage.getItem('id_token')) {
    localStorage.setItem('id_token', token);
  }
}

function removeUser() {
  localStorage.removeItem('id_token');
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
    if (localStorage.getItem('id_token')) {
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
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
      setUser(action.token);
      AuthStore.emitChange();
      browserHistory.push('/');
      break;

    case AuthConstants.LOGIN_ERROR:
      _errors = action.error;
      AuthStore.emitChange();
      break;

    case AuthConstants.LOGOUT_USER:
      removeUser();
      AuthStore.emitChange();
      break;

    default:
  }


});

export default AuthStore;
