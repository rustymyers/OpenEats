import { combineReducers } from 'redux'
import { default as user } from '../account/reducers/LoginReducer'
import { default as list } from '../list/reducers/GroceryListReducer'
import { default as recipe } from '../recipe/reducers/Reducer'
import { default as recipeForm } from '../recipe_form/reducers/Reducer'

const reducer = combineReducers({
  list,
  user,
  recipe,
  recipeForm,
});

export default reducer
