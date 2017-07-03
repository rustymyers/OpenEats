import React from 'react'
import { injectIntl, defineMessages } from 'react-intl'

import { ENTER_KEY } from '../constants/ListStatus'

export default injectIntl(React.createClass({
  getInitialState: function() {
    return {
      value: this.props.value || '',
    };
  },

  handleChange: function (event) {
    this.setState({value: event.target.value});
  },

  handleKeyDown: function (event) {
    if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  },

  handleSubmit: function (event) {
    var val = this.state.value.trim();
    if (val) {
      this.props.addList(val);
    }
  },

  render: function() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      header: {
        id: 'new_list.header',
        description: 'Create a New List',
        defaultMessage: 'Create a New List',
      },
      placeholder: {
        id: 'new_list.placeholder',
        description: 'Enter your list name.',
        defaultMessage: 'Enter your list name.',
      },
      button: {
        id: 'new_list.button',
        description: 'Create my List!',
        defaultMessage: 'Create my List!',
      },
    });

    return (
      <div className="new-list">
        <h2 className="new-list-heading">
          { formatMessage(messages.header) }
        </h2>
        <input
          type="text"
          autoFocus="true"
          className="form-control"
          placeholder={ formatMessage(messages.placeholder) }
          value={ this.state.value }
          onChange={ this.handleChange }
          onKeyDown={ this.handleKeyDown }
        />
        <button
          type="button"
          className="btn btn-lg btn-primary btn-block"
          onClick={ this.handleSubmit }
        >{ formatMessage(messages.button) }</button>
      </div>
    )
  }
}));
