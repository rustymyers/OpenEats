import React from 'react'
import { Link } from 'react-router'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import { Image, Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import AuthActions from '../../account/actions/AuthActions';
import AuthStore from '../../account/stores/AuthStore';

function getAuthState() {
  return {
    authenticated: AuthStore.isAuthenticated()
  };
}

export default injectIntl(React.createClass({
  render: function() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      brand: {
        id: 'nav.brand',
        description: 'Open Eats title',
        defaultMessage: 'Open Eats',
      },
      news: {
        id: 'nav.news',
        description: 'Navbar News',
        defaultMessage: 'News',
      },
      recipes: {
        id: 'nav.recipes',
        description: 'Navbar Recipes',
        defaultMessage: 'Recipes',
      }
    });

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <Image alt="Brand" src="/images/chef.png" responsive={ true } />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/news"><NavItem>{formatMessage(messages.news)}</NavItem></LinkContainer>
            <LinkContainer to="/browse"><NavItem>{formatMessage(messages.recipes)}</NavItem></LinkContainer>
            <Account/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}));

var Account = React.createClass({
  getInitialState: function() {
    return getAuthState();
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getAuthState());
  },

  render: function () {
    if (this.state.authenticated) {
      return <AccountMenu/>
    } else {
      return <AccountLogin/>
    }
  }
});


var AccountLogin = injectIntl(React.createClass({
  render: function () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      label: {
        id: 'nav.login.title',
        description: 'Login title',
        defaultMessage: 'Login',
      }
    });

    return (
      <LinkContainer to="/login"><MenuItem>{ formatMessage(messages.label) }</MenuItem></LinkContainer>
    )
  }
}));


var AccountMenu = injectIntl(React.createClass({
  logout: function() {
    AuthActions.logUserOut();
  },

  render: function () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      title: {
        id: 'nav.accountmenu.title',
        description: 'Account menu title',
        defaultMessage: 'My Account',
      },
      create_recipe: {
        id: 'nav.accountmenu.create_recipe',
        description: 'Create recipe title',
        defaultMessage: 'Create recipe',
      },
      grocery_list: {
        id: 'nav.accountmenu.grocery_list',
        description: 'Grocery List',
        defaultMessage: 'Grocery List',
      },
      logout: {
        id: 'nav.accountmenu.logout',
        description: 'Logout title',
        defaultMessage: 'Logout',
      },
      import: {
        id: 'nav.accountmenu.import',
        description: 'Import A Recipe',
        defaultMessage: 'Import Recipe',
      }
    });

    return (
      <NavDropdown eventKey={1} title={ formatMessage(messages.title) } id="basic-nav-dropdown">
        <LinkContainer to="/recipe/import"><MenuItem>{ formatMessage(messages.import) }</MenuItem></LinkContainer>
        <LinkContainer to="/recipe/create"><MenuItem>{ formatMessage(messages.create_recipe) }</MenuItem></LinkContainer>
        <LinkContainer to="/list"><MenuItem>{ formatMessage(messages.grocery_list) }</MenuItem></LinkContainer>
        <MenuItem divider />
        <NavItem onClick={this.logout}>{ formatMessage(messages.logout) }</NavItem>
      </NavDropdown>
    )
  }
}));
