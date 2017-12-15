import { EventEmitter } from 'events';
import { browserHistory } from 'react-router'

import AppDispatcher from '../../common/AppDispatcher';
import ListConstants from '../constants/ListConstants';

export const INIT_EVENT = 'init';
export const CHANGE_EVENT = 'change';
export const ERROR_EVENT = 'error';

var _lists = '';
var _list_id = '';
var _list_name = '';

class ListStoreClass extends EventEmitter {
  emitInit() {
    this.emit(INIT_EVENT);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  emitError() {
    this.emit(ERROR_EVENT);
  }

  addChangeListener(event, callback) {
    this.on(event, callback)
  }

  removeChangeListener(event, callback) {
    this.removeListener(event, callback)
  }

  get_id() {
    return _list_id
  }

  get_name() {
    return _list_name
  }

  get_lists() {
    return _lists
  }
}

const ListStore = new ListStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
ListStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case ListConstants.LIST_INIT:
      _list_id = action.active_list_id;
      _lists = action.lists;
      var list = _lists.filter(function(list) {
        if (list.id == _list_id) {
          return list;
        }
      });
      if (list.length > 0) {
        _list_name = list[0].title;
      } else if (action.active_list_id > 0) {
        browserHistory.replace('/list/');
      }
      ListStore.emitChange();
      break;

    case ListConstants.LIST_ADD:
      _list_id = action.id;
      _list_name = action.title;
      ListStore.emitChange();
      browserHistory.push('/list/' + _list_id);
      break;

    case ListConstants.LIST_SAVE:
      _lists = _lists.map(function(list) {
        if (list.id == _list_id) {
          list.title = action.title;
        }
        return list;
      });
      _list_name = action.title;
      ListStore.emitChange();
      break;

    case ListConstants.LIST_UPDATE_COUNT:
      _lists = _lists.map(function(list) {
        if (list.id == _list_id) {
          list.item_count += action.increment;
        }
        return list;
      });
      ListStore.emitChange();
      break;

    case ListConstants.LIST_DELETE:
      var remaining_lists = _lists.filter(function(list) {
        if (action.id != list.id) {
          return list;
        }
      });
      _lists = remaining_lists;
      var replace = '/list/';
      if (_lists.length > 0) {
        _list_id = _lists[0].id;
        _list_name = _lists[0].title;
        replace += _list_id;
      }
      ListStore.emitChange();
      browserHistory.replace(replace);
      break;

    default:
  }
});

module.exports.ListStore = ListStore;
