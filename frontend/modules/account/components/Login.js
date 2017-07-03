import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
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

export default injectIntl(React.createClass({
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

    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      please_sign_in: {
        id: 'login.please_sign_in',
        description: 'Please sign in header',
        defaultMessage: 'Please sign in',
      },
      username: {
        id: 'login.username',
        description: 'Username placeholder',
        defaultMessage: 'Username',
      },
      password: {
        id: 'login.password',
        description: 'Password placeholder',
        defaultMessage: 'Password',
      },
      sign_in: {
        id: 'login.sign_in',
        description: 'Sign in button',
        defaultMessage: 'Sign in',
      }
    });

    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        { this.state.errors ? ( <Alert/> ) : ''}
        <h2 className="form-signin-heading">{ formatMessage(messages.please_sign_in) }</h2>
        <input type="text" id="username" className="form-control" placeholder={ formatMessage(messages.username) } ref="username" autoFocus="true"/>
        <input type="password" id="password" className="form-control" placeholder={ formatMessage(messages.password) } ref="pass"/>
        <button className="btn btn-lg btn-primary btn-block" type="submit">{ formatMessage(messages.sign_in) }</button>
      </form>
    )
  }
}));

var Alert = injectIntl(React.createClass({
  render: function() {

    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      title: {
        id: 'login.alert.unable_to_login',
        description: 'Fail to login header',
        defaultMessage: 'Unable to login!',
      },
      message: {
        id: 'login.alert.confirm',
        description: 'Fail to login message',
        defaultMessage: 'Please confirm that the username and password are correct.',
      }
    });

    return (
      <div className="alert alert-danger">
        <strong>{ formatMessage(messages.title) }</strong> { formatMessage(messages.message) }
      </div>
    )
  }
}));