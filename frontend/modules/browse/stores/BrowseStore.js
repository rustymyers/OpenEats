import React from 'react';
import { EventEmitter } from 'events';
import AppDispatcher from '../../common/AppDispatcher';

class BrowseStore extends EventEmitter {
  constructor(AppDispatcher) {
    super(AppDispatcher);

    this.state = {
      loading: true,
      recipes: [],
      filter: {},
      total_recipes: 0
    };

    AppDispatcher.register(payload => {
      switch(payload.actionType) {
        case 'REQUEST_LOAD_RECIPES':
          this.state.loading = true;
          this.state.filter = payload.filter;
          this.emitChange();
          break;

        case 'PROCESS_LOAD_RECIPES':
          this.state.loading = false;
          this.state.recipes = payload.res.body.results;
          this.state.total_recipes = payload.res.body.count;
          this.emitChange();
          break;
      }
      });
  }

  getState() {
    return this.state;
  }

  emitChange() {
    this.emit('change');
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
};

BrowseStore.propTypes = {
  AppDispatcher: React.PropTypes.objectOf(AppDispatcher).isRequired
};

module.exports = new BrowseStore(AppDispatcher);