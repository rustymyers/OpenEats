import { EventEmitter } from 'events';

import AppDispatcher from '../../common/AppDispatcher';

export const INIT_EVENT = 'init';
export const CHANGE_EVENT = 'change';
export const ERROR_EVENT = 'error';

class ImportStore extends EventEmitter {
  constructor(AppDispatcher) {
    super(AppDispatcher);

    this.state = {
      source: '',
      loading: false,
      error: 0,
      showSupportedSite: false,
      supportedSites: [],
    };

    AppDispatcher.register(payload => {
      switch (payload.actionType) {
        case 'RECIPE_IMPORT_INIT':
          this.state.supportedSites = payload.sites;
          this.emitChange();
          break;

        case 'RECIPE_IMPORT_ERROR':
          this.state.error = payload.errorCode;
          this.state.loading = false;
          this.emitChange();
          break;

        case 'RECIPE_IMPORT_LOADING':
          this.state.loading = true;
          this.emitChange();
          break;

        case 'RECIPE_IMPORT_SUBMIT':
          this.state.error = 0;
          this.state.source = '';
          this.state.loading = false;
          this.emitChange();
          break;

        case 'RECIPE_IMPORT_TOGGLE_SITES':
          this.state.showSupportedSite = !this.state.showSupportedSite;
          this.emitChange();
          break;
      }

      return true;
    });
  }

  getStateValue(key) {
    return this.state[key];
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(event, callback) {
    this.on(event, callback);
  }

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }
}

module.exports.ImportStore = new ImportStore(AppDispatcher);
