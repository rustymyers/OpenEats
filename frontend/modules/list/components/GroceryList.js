import React from 'react'
import { injectIntl, defineMessages } from 'react-intl'

import AuthStore from '../../account/stores/AuthStore'
import ListAction from '../actions/ListActions'
import { ListStore, CHANGE_EVENT, INIT_EVENT  } from '../stores/ListStore'
import ListContainer from '../../list/components/ListContainer'
import MyLists from '../../list/components/MyLists'
import ListHeader from '../../list/components/ListHeader'
import NewList from '../../list/components/NewList'

require("./../css/grocery_list.scss");

export default injectIntl(React.createClass({

  getInitialState: function() {
    return {
      lists: ListStore.get_lists() || null,
      active_list_id: ListStore.get_id() || null,
      active_list_name: ListStore.get_name() || null,
    };
  },

  componentDidMount: function() {
    ListAction.init(this.props.params.list_id);
    ListStore.addChangeListener(CHANGE_EVENT, this._onChange);
  },

  componentWillReceiveProps(nextProps) {
    ListAction.init(nextProps.params.list_id);
  },

  componentWillUnmount: function() {
    ListStore.removeChangeListener(CHANGE_EVENT, this._onChange);
  },

  _onChange: function() {
    this.setState({
      lists: ListStore.get_lists() || null,
      active_list_id: ListStore.get_id() || null,
      active_list_name: ListStore.get_name() || null,
    });
  },

  addList: function(title) {
    ListAction.add(title);
  },

  updateList: function(title) {
    ListAction.save(this.state.active_list_id, title);
  },

  removeList: function() {
    ListAction.destroy(this.state.active_list_id);
  },

  render: function() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      my_lists: {
        id: 'grocery_list.my_lists',
        description: 'My Lists',
        defaultMessage: 'My Lists',
      },
      footer: {
        id: 'grocery_list.footer',
        description: 'Double Click to edit an item.',
        defaultMessage: 'Double Click to edit an item.',
      },
    });

    var render_list = '';
    if (this.state.active_list_id != null) {
      render_list = (
        <div className="col-md-9">
          <div className="grocery-list">
            <ListHeader
              title={ this.state.active_list_name }
              updateList = { this.updateList }
              removeList = { this.removeList }
            />
            <ListContainer list_id={ this.state.active_list_id }/>
          </div>
          <div className="list-info-footer">{ formatMessage(messages.footer) }</div>
        </div>
      );
    } else {
      render_list = (
        <div className="col-md-9">
          <NewList addList={ this.addList }/>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          { render_list }
          <div className="col-md-3">
            <MyLists title={ formatMessage(messages.my_lists) } data={ this.state.lists }/>
          </div>
        </div>
      </div>
    );
  }
}));
