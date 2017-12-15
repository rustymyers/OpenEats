import { EventEmitter } from 'events';

import AppDispatcher from '../../common/AppDispatcher';
import ItemConstants from '../constants/ItemConstants';

export const INIT_EVENT = 'init';
export const CHANGE_EVENT = 'change';
export const ERROR_EVENT = 'error';

var _key = '';
var _items = [];

class ItemStoreClass extends EventEmitter {
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

  getItems() {
    return _items;
  }

  getKey() {
    return _key;
  }

  getToogleItems(checked) {
    return _items.reduce(function (list, item) {
      if (item.completed != checked) {
        list.push({
          id: item.id,
          completed: checked
        });
      }
      return list;
    }, []);
  }

  getCheckedItems() {
    return _items.reduce(function (list, item) {
      if (item.completed == true) {
        list.push(item.id);
      }
      return list;
    }, []);
  }
}

const ItemStore = new ItemStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
ItemStore.dispatchToken = AppDispatcher.register(action => {

  switch (action.actionType) {

    case ItemConstants.ITEM_INIT:
      _key = action.id;
      _items = action.list.results.map(function (item) {
        return {
          id: item.id,
          title: item.title,
          completed: item.completed
        };
      });
      ItemStore.emitInit();
      break;

    case ItemConstants.ITEM_ADD:
      _items = _items.concat({
        id: action.data.id,
        title: action.data.title,
        completed: action.data.completed
      });
      ItemStore.emitChange();
      break;

    case ItemConstants.ITEM_SAVE:
      _items = _items.map(function (item) {
        if (item.id == action.item.id) {
          item.title = action.text
        }
        return item;
      });
      ItemStore.emitChange();
      break;

    case ItemConstants.ITEM_TOGGLE:
      _items = _items.map(function (item) {
        if (item.id == action.item.id) {
          item.completed = !item.completed
        }
        return item;
      });
      ItemStore.emitChange();
      break;

    case ItemConstants.ITEM_TOGGLE_ALL:
      // Note: it's usually better to use immutable data structures since they're
      // easier to reason about and React works very well with them. That's why
      // we use map() and filter() everywhere instead of mutating the array themselves.
      _items = _items.map(function (item) {
        item.completed = action.checked;
        return item;
      });
      ItemStore.emitChange();
      break;

    case ItemConstants.ITEM_DELETE:
      _items = _items.filter(function (candidate) {
        return candidate.id !== action.item.id;
      });
      ItemStore.emitChange();
      break;

    case ItemConstants.ITEM_DELETE_COMPLETED:
      _items = _items.filter(function (item) {
        return !item.completed;
      });
      ItemStore.emitChange();
      break;

    default:
  }
});

module.exports.ItemStore = ItemStore;
