import React from 'react'
import { injectIntl, defineMessages } from 'react-intl'

import ItemAction from '../actions/ItemActions'
import { ItemStore, CHANGE_EVENT, INIT_EVENT } from '../stores/ItemStore'
import ListFooter from './ListFooter'
import ListItem from './ListItem'

import {
  ALL_ITEMS,
  ACTIVE_ITEMS,
  COMPLETED_ITEMS,
  ENTER_KEY
} from '../constants/ListStatus'

export default injectIntl(React.createClass({
  getInitialState: function () {
    return {
      nowShowing: ALL_ITEMS,
      editing: null,
      newItem: '',
      items: ItemStore.getItems()
    };
  },

  componentDidMount: function () {
    if (this.props.list_id != null) {
      ItemAction.load_list(this.props.list_id);
    }
    ItemStore.addChangeListener(INIT_EVENT, this._onChange);
    ItemStore.addChangeListener(CHANGE_EVENT, this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.list_id != this.props.list_id) {
      ItemAction.load_list(nextProps.list_id);
    }
  },

  componentWillUnmount: function() {
    ItemStore.removeChangeListener(INIT_EVENT, this._onChange);
    ItemStore.removeChangeListener(CHANGE_EVENT, this._onChange);
  },

  _onChange: function () {
    this.setState({items: ItemStore.getItems()});
  },

  handleChange: function (event) {
    this.setState({newItem: event.target.value});
  },

  handleNewListKeyDown: function (event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = this.state.newItem.trim();

    if (val) {
      ItemAction.addItem(val);
      this.setState({newItem: ''});
    }
  },

  edit: function (item) {
    this.setState({editing: item.id});
  },

  save: function (itemToSave, text) {
    ItemAction.save(itemToSave, text);
    this.setState({editing: null});
  },

  cancel: function () {
    this.setState({editing: null});
  },

  filter_status: function (status) {
    this.setState({nowShowing: status});
  },

  toggle: function (itemToToggle) {
    ItemAction.toggle(itemToToggle);
  },

  toggleAll: function (event) {
    var checked = event.target.checked;
    ItemAction.toggleAll(checked);
  },

  destroy: function (item) {
    ItemAction.destroy(item);
  },

  clearCompleted: function () {
    ItemAction.clearCompleted();
  },

  render: function () {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      item: {
        id: 'list.new-input-placeholder',
        description: 'Placeholder for inputting new items',
        defaultMessage: 'What do you need to buy?',
      },
    });

    var footer;
    var main;
    var items = this.state.items;

    var shownItems = items.filter(function (item) {
      switch (this.state.nowShowing) {
      case ACTIVE_ITEMS:
        return !item.completed;
      case COMPLETED_ITEMS:
        return item.completed;
      default:
        return true;
      }
    }, this);

    var listItems = shownItems.map(function (item) {
      return (
        <ListItem
          key={ item.id }
          item={ item }
          onToggle={ this.toggle.bind(this, item) }
          onDestroy={ this.destroy.bind(this, item) }
          onEdit={ this.edit.bind(this, item) }
          editing={ this.state.editing === item.id }
          onSave={ this.save.bind(this, item) }
          onCancel={ this.cancel}
        />
      );
    }, this);

    var activeListCount = items.reduce(function (accum, item) {
      return item.completed ? accum : accum + 1;
    }, 0);

    var completedCount = items.length - activeListCount;

    if (activeListCount || completedCount) {
      footer =
        <ListFooter
          count={ activeListCount }
          completedCount={ completedCount }
          nowShowing={ this.state.nowShowing }
          onClearCompleted={ this.clearCompleted }
          filter_status={ this.filter_status }
        />;
    }

    if (items.length) {
      main = (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={ this.toggleAll }
            checked={ activeListCount === 0 }
          />
          <ul className="item-list">
            { listItems }
          </ul>
        </section>
      );
    }

    return (
      <div>
        <header className="header">
          <input
            className="new-item"
            placeholder={ formatMessage(messages.item) }
            value={ this.state.newItem }
            onKeyDown={ this.handleNewListKeyDown }
            onChange={ this.handleChange }
            autoFocus={ true }
          />
        </header>
        { main }
        { footer }
      </div>
    );
  }
}));
