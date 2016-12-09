import React from 'react'
import { browserHistory } from 'react-router'
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

// Load in the base CSS
require("./../css/login.scss");

function getAuthErrors() {
  return {
    authenticated: AuthStore.isAuthenticated(),
    errors: AuthStore.getErrors()
  };
}

export default React.createClass({
  getInitialState: function() {
    return getAuthErrors();
  },

  componentDidMount: function() {
    if (AuthStore.isAuthenticated()) {
      browserHistory.push('/');
    }
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getAuthErrors());
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var username = this.refs.username.value;
    var pass = this.refs.pass.value;
    AuthActions.getToken(username, pass);
  },
  render: function() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        { this.state.errors ? ( <Alert/> ) : ''}
        <h2 className="form-signin-heading">Please sign in</h2>
        <input type="text" id="username" className="form-control" placeholder="Username" ref="username" autoFocus="true"/>
        <input type="password" id="password" className="form-control" placeholder="Password" ref="pass"/>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    )
  }
});

var Alert = React.createClass({
  render: function() {
    return (
      <div className="alert alert-danger">
        <strong>Unable to login!</strong> Please confirm that the username and password are correct.
      </div>
    )
  }
});