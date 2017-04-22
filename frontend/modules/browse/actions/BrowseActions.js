import AppDispatcher from '../../common/AppDispatcher';
import Api from '../../common/Api';

const BrowseActions = {
  loadRecipes: function(filter) {
    AppDispatcher.dispatch({actionType: 'REQUEST_LOAD_RECIPES'});
    Api.getRecipes(this.processLoadedRecipes, filter);
  },

  processLoadedRecipes: function(err, res) {
    AppDispatcher.dispatch({
      actionType: 'PROCESS_LOAD_RECIPES',
      err: err,
      res: res
    })
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