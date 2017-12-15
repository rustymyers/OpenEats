import React from 'react'
import { browserHistory } from 'react-router'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import AuthStore from '../../account/stores/AuthStore'
import { RecipeStore, INIT_EVENT, ERROR_EVENT, CHANGE_EVENT } from '../stores/RecipeStore';
import RecipeActions from '../actions/RecipeActions';

import { DirectionList, IngredientList, SubRecipeList } from './DataList'
import TagList from './TagList'
import { Input, File, Alert, Select, TextArea } from '../../common/form/FormComponents'

require("./../css/create.scss");

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromStore();

    this._onInit = this._onInit.bind(this);
    this._onChange = this._onChange.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.CreateRecipe = this.CreateRecipe.bind(this);
  }

  getStateFromStore() {
    return {
      data: RecipeStore.getForm(),
      course: RecipeStore.getCourse(),
      cuisine: RecipeStore.getCuisine(),
      tags: RecipeStore.getTags(),
      recipeList: [],
      errors: false
    };
  }

  getErrorsFromStore() {
    return RecipeStore.getError();
  }

  getAuthUser() {
    return AuthStore.getUser();
  }

  componentDidMount() {
    RecipeActions.init(this.props.params.id);
    RecipeActions.fetchRecipeList('');
    RecipeStore.addChangeListener(INIT_EVENT, this._onInit);
    RecipeStore.addChangeListener(CHANGE_EVENT, this._onChange);
    RecipeStore.addChangeListener(ERROR_EVENT, this.setErrors);
  }

  componentWillUnmount() {
    RecipeStore.removeChangeListener(INIT_EVENT, this._onInit);
    RecipeStore.removeChangeListener(CHANGE_EVENT, this._onChange);
    RecipeStore.removeChangeListener(ERROR_EVENT, this.setErrors);
  }

  _onInit() {
    const state = this.getStateFromStore();
    this.setState(state);

    if (Object.keys(state.data).length > 0) {
      const user = this.getAuthUser();
      if (state.data.author !== user.id && state.data.id) {
        browserHistory.replace('/recipe/' + state.data.id);
      }
    }
  }

  _onChange() {
    this.setState({
      recipeList: RecipeStore.getRecipeList(),
      data: RecipeStore.getForm()
    });
  }

  setErrors() {
    this.setState({
      errors: this.getErrorsFromStore()
    });
  }

  CreateRecipe(e) {
    e.preventDefault();
    RecipeActions.submit(this.state.data);
  }

  update(name, value) {
    RecipeActions.update(name, value);
  }

  getErrors(name) {
    return (this.state.errors !== false && name in this.state.errors) ? this.state.errors[name] : false ;
  }

  render() {

    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      name_label: {
        id: 'recipe.create.name_label',
        description: 'Recipe name label',
        defaultMessage: 'Recipe name',
      },
      name_placeholder: {
        id: 'recipe.create.name_placeholder',
        description: 'Recipe name placeholder',
        defaultMessage: 'Recipe',
      },
      course_label: {
        id: 'recipe.create.course_label',
        description: 'Course label',
        defaultMessage: 'Course',
      },
      cuisine_label: {
        id: 'recipe.create.cuisine_label',
        description: 'Cuisine label',
        defaultMessage: 'Cuisine',
      },
      tags_label: {
        id: 'recipe.create.tags_label',
        description: 'Tags label',
        defaultMessage: 'Tags',
      },
      prep_time_label: {
        id: 'recipe.create.prep_time_label',
        description: 'Prep time label',
        defaultMessage: 'Prep time',
      },
      prep_time_placeholder: {
        id: 'recipe.create.prep_time_placeholder',
        description: 'Prep time placeholder',
        defaultMessage: 'Prep time in minutes',
      },
      cooking_time_label: {
        id: 'recipe.create.cooking_time_label',
        description: 'Cooking time label',
        defaultMessage: 'Cooking time',
      },
      cooking_time_placeholder: {
        id: 'recipe.create.cooking_time_placeholder',
        description: 'Cooking time placeholder',
        defaultMessage: 'Cooking time in minutes',
      },
      servings_label: {
        id: 'recipe.create.servings_label',
        description: 'Servings label',
        defaultMessage: 'Servings',
      },
      servings_placeholder: {
        id: 'recipe.create.servings_placeholder',
        description: 'Servings placeholder',
        defaultMessage: 'Servings',
      },
      rating_label: {
        id: 'recipe.create.rating_label',
        description: 'Rating label',
        defaultMessage: 'Rating',
      },
      rating_placeholder: {
        id: 'recipe.create.rating_placeholder',
        description: 'Rating placeholder',
        defaultMessage: 'Rate this recipe from 0 to 5',
      },
      subrecipes_label: {
        id: 'recipe.create.subrecipes_label',
        description: 'Recipe links label',
        defaultMessage: 'Recipe links',
      },
      ingredients_label: {
        id: 'recipe.create.ingredients_label',
        description: 'Recipe ingredients label',
        defaultMessage: 'Ingredients',
      },
      directions_label: {
        id: 'recipe.create.directions_label',
        description: 'Rating label',
        defaultMessage: 'Directions',
      },
      information_label: {
        id: 'recipe.create.information_label',
        description: 'Recipe information label',
        defaultMessage: 'Recipe information',
      },
      information_placeholder: {
        id: 'recipe.create.information_placeholder',
        description: 'Recipe information placeholder',
        defaultMessage: 'A quick description of the recipe',
      },
      source_label: {
        id: 'recipe.create.source_label',
        description: 'Rating source label',
        defaultMessage: 'Source',
      },
      source_placeholder: {
        id: 'recipe.create.source_placeholder',
        description: 'Rating source placeholder',
        defaultMessage: 'URL source of the recipe (if any)',
      },
      photo_label: {
        id: 'recipe.create.photo_label',
        description: 'Photo label',
        defaultMessage: 'Photo',
      },
      photo_placeholder: {
        id: 'recipe.create.photo_placeholder',
        description: 'Photo placeholder',
        defaultMessage: 'Photo',
      },
      submit: {
        id: 'recipe.create.submit',
        description: 'Submit recipe button',
        defaultMessage: 'Submit recipe',
      }
    });

    return (
      <div className="container">
        <div className="row">
          <div id="recipe" className="col-lg-push-1 col-lg-10">
            <form className="recipe-form">
              <Input
                name="title"
                type="text"
                label={ formatMessage(messages.name_label) }
                placeholder={ formatMessage(messages.name_placeholder) }
                change={ this.update }
                value={ this.state.data.title }
                errors={ this.getErrors('title') } />
              <div className="row">
                <Select
                  name="course"
                  data={ this.state.course }
                  label={ formatMessage(messages.course_label) }
                  size="col-sm-4 col-xs-12"
                  change={ this.update }
                  value={ this.state.data.course }
                  errors={ this.getErrors('course') } />
                <Select
                  name="cuisine"
                  data={ this.state.cuisine }
                  label={ formatMessage(messages.cuisine_label) }
                  size="col-sm-4 col-xs-12"
                  change={ this.update }
                  value={ this.state.data.cuisine }
                  errors={ this.getErrors('cuisine') } />
                <TagList
                  name="tags"
                  data={ this.state.tags }
                  label={ formatMessage(messages.tags_label) }
                  size="col-sm-4 col-xs-12"
                  change={ this.update }
                  tags={ this.state.data.tags }
                  errors={ this.getErrors('tags') } />
              </div>

              <div className="row">
                <Input
                  name="prep_time"
                  type="number"
                  label={ formatMessage(messages.prep_time_label) }
                  placeholder={ formatMessage(messages.prep_time_placeholder) }
                  size="col-sm-3 col-xs-12"
                  change={ this.update }
                  value={ this.state.data.prep_time }
                  errors={ this.getErrors('prep_time') } />
                <Input
                  name="cook_time"
                  type="number"
                  label={ formatMessage(messages.cooking_time_label) }
                  placeholder={ formatMessage(messages.cooking_time_placeholder) }
                  size="col-sm-3 col-xs-12"
                  change={ this.update }
                  value={ this.state.data.cook_time }
                  errors={ this.getErrors('cook_time') } />
                <Input
                  name="servings"
                  type="number"
                  label={ formatMessage(messages.servings_label) }
                  placeholder={ formatMessage(messages.servings_placeholder) }
                  size="col-sm-3 col-xs-12"
                  change={ this.update }
                  value={ this.state.data.servings }
                  errors={ this.getErrors('servings') } />
                <Input
                  name="rating"
                  type="number"
                  label={ formatMessage(messages.rating_label) }
                  placeholder={ formatMessage(messages.rating_placeholder) }
                  size="col-sm-3 col-xs-12"
                  change={ this.update }
                  value={ this.state.data.rating }
                  errors={ this.getErrors('rating') } />
              </div>

              <SubRecipeList
                name="subrecipes"
                label={ formatMessage(messages.subrecipes_label) }
                change={ this.update }
                data={ this.state.data.subrecipes }
                recipeList={ this.state.recipeList }
                errors={ this.getErrors('subrecipes') } />
              <IngredientList
                name="ingredients"
                label={ formatMessage(messages.ingredients_label) }
                change={ this.update }
                data={ this.state.data.ingredient_groups }
                errors={ this.getErrors('ingredients') } />
              <DirectionList
                name="directions"
                label={ formatMessage(messages.directions_label) }
                change={ this.update }
                data={ this.state.data.directions }
                errors={ this.getErrors('directions') } />
              <TextArea
                name="info"
                rows="4"
                label={ formatMessage(messages.information_label) }
                placeholder={ formatMessage(messages.information_placeholder) }
                change={ this.update }
                value={ this.state.data.info }
                errors={ this.getErrors('info') } />
              <Input
                name="source"
                type="text"
                label={ formatMessage(messages.source_label) }
                placeholder={ formatMessage(messages.source_placeholder) }
                change={ this.update }
                value={ this.state.data.source }
                errors={ this.getErrors('source') } />

              { this.state.data.photo_thumbnail ?
                <img src={ this.state.data.photo_thumbnail } /> :
                null
              }

              <File
                name="photo"
                label={ formatMessage(messages.photo_label) }
                placeholder={ formatMessage(messages.photo_placeholder) }
                accept="image/*"
                change={ this.update } />

              { this.state.errors !== false ? ( <Alert/> ) : ''}
              <button
                className="btn btn-primary"
                onClick={ this.CreateRecipe }>
                  { formatMessage(messages.submit) }
              </button>

            </form>
          </div>
        </div>
      </div>
    )
  }
};

module.exports.RecipeForm = injectIntl(RecipeForm);