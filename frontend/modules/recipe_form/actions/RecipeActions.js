import { request } from '../../common/CustomSuperagent';
import AppDispatcher from '../../common/AppDispatcher';
import RecipeConstants from '../constants/RecipeConstants';
import { serverURLs } from '../../common/config'

class RecipeActions {
  submit(data) {
    let photo = false;
    if (typeof data.photo == "object") {
      photo = data.photo;
    }

    delete data['photo'];
    delete data['photo_thumbnail'];

    if (!('id' in data)) {
      data['ingredient_groups'] = data['ingredients'];
      // delete data['ingredients'];
    }

    if (data['ingredient_groups']) {
      let ingredientGroups = [];
      let ingGroups = JSON.parse(JSON.stringify(data['ingredient_groups']));
      ingGroups.map((ingredient) => {
        let group = ingredient.group;
        let added = false;
        ingredientGroups.map((ingredient_group) => {
          if (ingredient_group.title === group) {
            ingredient_group.ingredients.push({
              title: ingredient.title,
              quantity: ingredient.quantity,
              measurement: ingredient.measurement,
            });
            added = true;
          }
        });

        if (!added) {
          let ingredients = [{
            title: ingredient.title,
            quantity: ingredient.quantity,
            measurement: ingredient.measurement,
          }];

          ingredientGroups.push({
            title: group,
            ingredients: ingredients,
          })
        }
      });

      data['ingredient_groups'] = ingredientGroups;
    }

    let r = 'id' in data ?
      request.put(serverURLs.recipe + data.id + '/') :
      request.post(serverURLs.recipe) ;

    r.send(data)
      .end((err, res) => {
        if (!err && res) {
          //send the image once the file has been created

          if (photo) {
            this.submitPhoto(res, photo);
          } else {
            this.handleSubmit(res.body.id);
          }
        } else {
          console.error(serverURLs.recipe, err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  submitPhoto(res, photo) {
    request
      .patch(serverURLs.recipe + res.body.id + "/")
      .attach('photo', photo)
      .end((err, res) => {
        if (!err && res) {
          this.handleSubmit(res.body.id);
        } else {
          console.error(serverURLs.recipe, err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  handleSubmit(new_recipe_id) {
    AppDispatcher.dispatch({
      actionType: RecipeConstants.SUBMIT,
      new_recipe_id: new_recipe_id
    });
  }

  error(error) {
    AppDispatcher.dispatch({
      actionType: RecipeConstants.ERROR,
      error: error
    });
  }

  update(name, value) {
    AppDispatcher.dispatch({
      actionType: RecipeConstants.UPDATE,
      name: name,
      value: value,
    });
  }

  fetchTags() {
    request.get(serverURLs.tag)
    .end((err, res) => {
      if (!err && res) {
        const tags = res.body.results;
        AppDispatcher.dispatch({
          actionType: RecipeConstants.INIT,
          tags: tags,
        });
      } else {
        console.error(serverURLs.tag, err.toString());
      }
    });
  }

  fetchCuisine() {
    request.get(serverURLs.cuisine)
    .end((err, res) => {
      if (!err && res) {
        const cuisine = res.body.results;
        AppDispatcher.dispatch({
          actionType: RecipeConstants.INIT,
          cuisine: cuisine,
        });
      } else {
        console.error(serverURLs.cuisine, err.toString());
      }
    });
  }

  fetchRecipeList(searchTerm) {
    request.get(serverURLs.recipe + '?fields=id,title&limit=5&search=' + searchTerm)
    .end((err, res) => {
      if (!err && res) {
        let recipeList = [];
        res.body.results.map((recipe) => {
          recipeList.push(recipe.title);
        });
        AppDispatcher.dispatch({
          actionType: RecipeConstants.UPDATE_RECIPE_LIST,
          recipeList: recipeList,
        });
      } else {
        console.error(serverURLs.course, err.toString());
      }
    });
  }

  fetchCourses() {
    request.get(serverURLs.course)
    .end((err, res) => {
      if (!err && res) {
        const course = res.body.results;
        AppDispatcher.dispatch({
          actionType: RecipeConstants.INIT,
          course: course,
        });
      } else {
        console.error(serverURLs.course, err.toString());
      }
    });
  }

  fetchRecipe(recipe_id) {
    var url = serverURLs.recipe + recipe_id;
    request
      .get(url)
      .end((err, res) => {
        if (!err && res) {
          let data = res.body;
          let ings = [];
          if (data.ingredient_groups) {
            let ingGroups = JSON.parse(JSON.stringify(data.ingredient_groups));
            ingGroups.map((ingredient_group) => {
              ingredient_group.ingredients.map((ingredient) => {
                ings.push({
                  title: ingredient.title,
                  quantity: ingredient.quantity,
                  measurement: ingredient.measurement,
                  group: ingredient_group.title
                })
              });
            });
            data.ingredient_groups = ings;
          }
          AppDispatcher.dispatch({
            actionType: RecipeConstants.INIT,
            recipe: data,
          });
        } else {
          console.error(url, err.toString());
        }
      })
  }

  init(recipe_id) {
    this.fetchTags();
    this.fetchCuisine();
    this.fetchCourses();

    if (recipe_id) {
      this.fetchRecipe(recipe_id);
    }
  }
}

const RecipeAction = new RecipeActions();

export default RecipeAction;
