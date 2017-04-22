import React from 'react'
import { EventEmitter } from 'events';
import AppDispatcher from '../../common/AppDispatcher';
import Api from '../../common/Api';

class FilterStore extends EventEmitter {
  constructor(AppDispatcher, name) {
    super(AppDispatcher);

    this.state = {
      loading: true,
      data: []
    };

    this.name = name;

    AppDispatcher.register(payload => {
      switch (payload.actionType) {
        case 'REQUEST_LOAD_' + this.name.toUpperCase() + 'S':
          this.requestLoadData(payload);
          break;

        case 'PROCESS_LOAD_' + this.name.toUpperCase() + 'S':
          this.processLoadData(payload);
          break;
      }

      return true;
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

  processLoadData(action) {
    this.state.loading = false;
    this.state.data = action.res.body.results;
    this.emitChange();
  }

  requestLoadData(action) {
    this.state.loading = true;
    this.emitChange();
  }
};

FilterStore.propTypes = {
  AppDispatcher: React.PropTypes.objectOf(AppDispatcher).isRequired,
  name: React.PropTypes.string.isRequired
};

module.exports.CuisineStore = new FilterStore(AppDispatcher, 'cuisine');
module.exports.CourseStore = new FilterStore(AppDispatcher, 'course');
module.exports.RatingStore = new FilterStore(AppDispatcher, 'rating');