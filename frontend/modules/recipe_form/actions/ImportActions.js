import { request } from '../../common/CustomSuperagent';
import AppDispatcher from '../../common/AppDispatcher';
import RecipeConstants from '../constants/RecipeConstants';
import ImportConstants from '../constants/ImportConstants';
import { serverURLs } from '../../common/config'
import { browserHistory } from 'react-router'

class RecipeActions {
  importRecipe(url) {
    AppDispatcher.dispatch({
      actionType: ImportConstants.RECIPE_IMPORT_LOADING,
    });
    request
      .post(serverURLs.import_recipe)
      .send({ 'url': url })
      .end((err, res) => {
        if (!err && res) {
          let result = res.body;
          if (result.hasOwnProperty('error')) {
            AppDispatcher.dispatch({
              actionType: ImportConstants.RECIPE_IMPORT_ERROR,
              errorCode: result.error,
            });
          } else {
            AppDispatcher.dispatch({
              actionType: ImportConstants.RECIPE_IMPORT_SUBMIT,
            });
            AppDispatcher.dispatch({
              actionType: RecipeConstants.IMPORT,
              recipe: result,
            });
            browserHistory.push('/recipe/create');
          }
        } else {
          console.error(err.toString());
        }
      });
  }

  toggleSupportedSites() {
    AppDispatcher.dispatch({
      actionType: ImportConstants.RECIPE_IMPORT_TOGGLE_SITES,
    });
  }

  init() {
    request
      .get(serverURLs.import_recipe)
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: ImportConstants.RECIPE_IMPORT_INIT,
            sites: res.body
          });
        }
      })
  }
}

const RecipeAction = new RecipeActions();

export default RecipeAction;
