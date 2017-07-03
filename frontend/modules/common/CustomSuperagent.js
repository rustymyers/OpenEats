import AuthStore from '../account/stores/AuthStore'
import defaults from 'superagent-defaults'

// Create a defaults context
var request = defaults();

// Setup some defaults
request.set('Accept', 'application/json');
// Add the user token if the user is logged in
if (AuthStore.isAuthenticated()) {
  request.set('Authorization', 'Token ' + AuthStore.getToken());
}

module.exports.request = request;
