import React from 'react'
import DebounceInput from 'react-debounce-input';
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

export default injectIntl(React.createClass({

  getInitialState: function() {
    return { value: this.props.value || '' };
  },

  _onChange(event) {
    this.setState({ value: event.target.value });
    if(this.props.filter) {
      this.props.filter('search', event.target.value);
    }
  },

  render: function() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      search: {
        id: 'searchbar.label',
        description: 'SearchBar label',
        defaultMessage: 'Search for Recipes',
      },
      search_mobile: {
        id: 'searchbar.mobile.label',
        description: 'SearchBar mobile label',
        defaultMessage: 'Search',
      },
      input_placeholder: {
        id: 'searchbar.placeholder',
        description: 'SearchBar input placeholder',
        defaultMessage: 'Enter a title, tag, or ingredient',
      }
    });

    return (
      <div className={ this.props.format }>
        <div className="input-group search-bar">
          <span className="input-group-addon" id="search_bar_label">
            <span className="hidden-xs">{ formatMessage(messages.search) }:</span>
            <span className="visible-xs">{ formatMessage(messages.search_mobile) }:</span>
          </span>
          <DebounceInput
            name="SearchBar"
            minLength={2}
            debounceTimeout={250}
            aria-describedby="search_bar_label"
            className="form-control"
            placeholder={ formatMessage(messages.input_placeholder) }
            value={ this.state.value }
            onChange={ this._onChange }/>
        </div>
      </div>
    )
  }
}));