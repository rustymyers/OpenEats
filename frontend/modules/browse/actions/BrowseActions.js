import AppDispatcher from '../../common/AppDispatcher';
import Api from '../../common/Api';
import history from '../../common/history'
import DefaultFilters from '../constants/DefaultFilters'

const BrowseActions = {
  browseInit: function(query) {
    let filter = DefaultFilters;

    if (Object.keys(query).length > 0) {
      for (let key in query) {
        filter[key] = query[key];
      }
    }

    this.loadRecipes(filter);
    this.loadCourses(filter);
    this.loadCuisines(filter);
    this.loadRatings(filter);
  },

  loadRecipes: function(filter) {
    AppDispatcher.dispatch({
      actionType: 'REQUEST_LOAD_RECIPES',
      filter: filter
    });
    Api.getRecipes(this.processLoadedRecipes, filter);
    window.scrollTo(0, 0);
  },

  updateURL: function(filter) {
    // TODO: use https://github.com/sindresorhus/query-string
    let encode_data = [];
    for (let key in filter) {
      if (filter[key]) {
        encode_data.push(
          encodeURIComponent(key) + '=' + encodeURIComponent(filter[key])
        );
      }
    }

    let path = '/browse/';
    if (encode_data.length > 0) {
       path += '?' + encode_data.join('&');
    }

    history.push(path);
  },

  processLoadedRecipes: function(err, res) {
    AppDispatcher.dispatch({
      actionType: 'PROCESS_LOAD_RECIPES',
      err: err,
      res: res
    });
  },

  loadCourses: function(filter) {
    AppDispatcher.dispatch({actionType: 'REQUEST_LOAD_COURSES'});
    Api.getCourses(this.processLoadedCourses, filter);
  },

  processLoadedCourses: function(err, res) {
    AppDispatcher.dispatch({
      actionType: 'PROCESS_LOAD_COURSES',
      err: err,
      res: res
    })
  },

  loadCuisines: function(filter) {
    AppDispatcher.dispatch({actionType: 'REQUEST_LOAD_CUISINES'});
    Api.getCuisines(this.processLoadedCuisines, filter);
  },

  processLoadedCuisines: function(err, res) {
    AppDispatcher.dispatch({
      actionType: 'PROCESS_LOAD_CUISINES',
      err: err,
      res: res
    })
  },

  loadRatings: function(filter) {
    AppDispatcher.dispatch({actionType: 'REQUEST_LOAD_RATINGS'});
    Api.getRatings(this.processLoadedRatings, filter);
  },

  processLoadedRatings: function(err, res) {
    AppDispatcher.dispatch({
      actionType: 'PROCESS_LOAD_RATINGS',
      err: err,
      res: res
    })
  }
};

module.exports = BrowseActions;