import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';
import Alert from './Alert'

// Load in the base CSS
require("./../css/login.scss");

function getAuthErrors() {
  return {
    authenticated: AuthStore.isAuthenticated(),
    errors: AuthStore.getErrors()
  };
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = getAuthErrors();
  }

  componentDidMount() {
    if (AuthStore.isAuthenticated()) {
      this.props.history.push('/');
    }
    AuthStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(getAuthErrors());
  };

  handleSubmit = e => {
    e.preventDefault();
    let username = this.refs.username.value;
    let pass = this.refs.pass.value;
    AuthActions.getToken(username, pass);
  };

  render() {
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
}

export default injectIntl(Login)
