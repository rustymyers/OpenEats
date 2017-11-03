import { combineReducers } from 'redux'
import { default as list } from '../list/reducers/GroceryListReducer'
import { default as recipe } from '../recipe/reducers/Reducer'

const reducer = combineReducers({
  list,
  recipe,
});

export default reducer
