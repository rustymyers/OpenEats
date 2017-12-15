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

import AuthStore from '../../account/stores/AuthStore';
import { ListStore, CHANGE_EVENT } from '../../list/stores/ListStore';
import ListActions from '../../list/actions/ListActions';

import { CreateRecipeMenuItem } from './CreateRecipeMenuItem'
import { GroceryListMenuItem } from './GroceryListMenuItem'
import { AccountMenuMenuItem, AccountLoginMenuItem } from './MyAccountMenuItem'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = this._getState();

    this._getState = this._getState.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
    ListStore.addChangeListener(CHANGE_EVENT, this._onChange);
    if (AuthStore.isAuthenticated()) {
      ListActions.init();
    }
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
    ListStore.removeChangeListener(CHANGE_EVENT, this._onChange);
  }

  _getState() {
    let authenticated = AuthStore.isAuthenticated();
    // We need to check if the state is being changed from `false` to `true`.
    // If it is we need to init the list store so the menu has teh users lists.
    if (this.hasOwnProperty('state')) {
      if (!this.state.authenticated && authenticated) {
        ListActions.init()
      }
    }

    return {
      authenticated: authenticated,
      lists: ListStore.get_lists() || []
    };
  }

  _onChange() {
    this.setState(this._getState());
  }

  render() {
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
        defaultMessage: 'Browse Recipes',
      },
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
            <LinkContainer to="/news">
              <NavItem>{formatMessage(messages.news)}</NavItem>
            </LinkContainer>
            <LinkContainer to="/browse">
              <NavItem>{formatMessage(messages.recipes)}</NavItem>
            </LinkContainer>
            {( this.state.authenticated ?
                <CreateRecipeMenuItem/> : null
            )}
            {( this.state.authenticated ?
                <GroceryListMenuItem data={ this.state.lists }/> : null
            )}
          </Nav>
          <Nav pullRight>
            {( this.state.authenticated ?
                <AccountMenuMenuItem/> : <AccountLoginMenuItem/>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

module.exports = injectIntl(NavBar);
