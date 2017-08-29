import AuthStore from '../account/stores/AuthStore'
import defaults from 'superagent-defaults'

// Create a defaults context

let request = function() {
  let customRequest = defaults();

  // Setup some defaults
  customRequest.set('Accept', 'application/json');
  // Add the user token if the user is logged in
  if (AuthStore.isAuthenticated()) {
    customRequest.set('Authorization', 'Token ' + AuthStore.getToken());
  }

  return customRequest;
};

module.exports.request = request;
