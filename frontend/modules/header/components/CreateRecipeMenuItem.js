import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import { NavDropdown, MenuItem, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class CreateRecipeMenuItem extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      create_recipe: {
        id: 'nav.create_recipe',
        description: 'Create recipe title',
        defaultMessage: 'Create recipe',
      },
      import: {
        id: 'nav.import',
        description: 'Import A Recipe',
        defaultMessage: 'Import Recipe',
      },
    });

    return (
      <NavDropdown eventKey="recipe"
                   title={ formatMessage(messages.create_recipe) }
                   id="basic-nav-dropdown">
        <LinkContainer to="/recipe/create">
          <MenuItem>{ formatMessage(messages.create_recipe) }</MenuItem>
        </LinkContainer>
        <MenuItem divider />
        <LinkContainer to="/recipe/import">
          <MenuItem>{ formatMessage(messages.import) }</MenuItem>
        </LinkContainer>
      </NavDropdown>
    )
  }
}

module.exports.CreateRecipeMenuItem = injectIntl(CreateRecipeMenuItem);
