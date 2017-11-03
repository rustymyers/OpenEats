import { EventEmitter } from 'events';
import history from '../../common/history'

import AppDispatcher from '../../common/AppDispatcher';
import RecipeConstants from '../constants/RecipeConstants';

export const INIT_EVENT = 'init';
export const CHANGE_EVENT = 'change';
export const ERROR_EVENT = 'error';

var _formData = {};
var _recipeList = [];
var _tags = [];
var _course = [];
var _cuisine = [];
var _errors = false;

function setData(name, value) {
  _formData[name] = value;
}

class RecipeStoreClass extends EventEmitter {
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

  getCourse() {
    return _course;
  }

  getCuisine() {
    return _cuisine;
  }

  getTags() {
    return _tags;
  }

  getError() {
    return _errors;
  }

  getForm() {
    return _formData;
  }

  getRecipeList() {
    return _recipeList;
  }

  getFormData(name) {
    return _formData[name];
  }
}

const RecipeStore = new RecipeStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
RecipeStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case RecipeConstants.UPDATE_RECIPE_LIST:
      _recipeList = action.recipeList;
      RecipeStore.emitChange();
      break;

    case RecipeConstants.UPDATE:
      setData(action.name, action.value);
      RecipeStore.emitChange();
      break;

    case RecipeConstants.INIT:
      if (action.tags) {
        _tags = action.tags;
      }

      if (action.course) {
        _course = action.course;
      }

      if (action.cuisine) {
        _cuisine = action.cuisine;
      }

      if (action.recipe) {
        _formData = action.recipe;

        _formData.directions = _formData.directions.map((direction, key) => {
          return {
            title: direction.title,
            step: direction.step
          };
        });
      }

      RecipeStore.emitInit();
      break;

    case RecipeConstants.ERROR:
      _errors = action.error;
      RecipeStore.emitError();
      break;

    case RecipeConstants.IMPORT:
      _formData = Object.assign(_formData, action.recipe);
      RecipeStore.emitChange();
      break;

    case RecipeConstants.SUBMIT:
      history.push('/recipe/' + action.new_recipe_id);
      _formData = {};
      _errors = false;
      RecipeStore.emitChange();
      break;

    default:
  }
});

module.exports.RecipeStore = RecipeStore;
