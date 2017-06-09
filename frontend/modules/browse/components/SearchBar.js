import React from 'react'
import DebounceInput from 'react-debounce-input';
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || ''
    };

    this._clearInput = this._clearInput.bind(this);
    this._onChange = this._onChange.bind(this);
    this._filter = this._filter.bind(this);
  }

  _clearInput() {
    this.setState({ value: '' }, this._filter);
  }

  _onChange(event) {
    this.setState({ value: event.target.value }, this._filter);
  }

  _filter() {
    if (this.props.filter) {
      this.props.filter('search', this.state.value);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.value) {
      this.setState({ value: '' });
    } else if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  render() {
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

    let clearInput = '';
    if (this.state.value) {
      clearInput = (
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={ this._clearInput }>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"/>
          </button>
        </span>
      )
    }

    return (
      <div className={ this.props.format }>
        <div className="input-group search-bar">
          <span className="input-group-addon" id="search_bar_label">
            <span className="hidden-xs">{ formatMessage(messages.search) }:</span>
            <span className="visible-xs">{ formatMessage(messages.search_mobile) }:</span>
          </span>
          <DebounceInput
            name="SearchBar"
            minLength={ 2 }
            debounceTimeout={ 250 }
            aria-describedby="search_bar_label"
            className="form-control"
            placeholder={ formatMessage(messages.input_placeholder) }
            value={ this.state.value }
            onChange={ this._onChange }/>
          { clearInput }
        </div>
      </div>
    )
  }
}

module.exports.SearchBar = injectIntl(SearchBar);
