import React from 'react'
import { Link, browserHistory } from 'react-router'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl'

import Ingredients from './Ingredients'
import Directions from './Directions'
import Ratings from './Ratings'
import { Input } from '../../common/form/FormComponents'

require("./../css/recipe.scss");

class RecipeScheme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data
    };

    this.updateServings = this.updateServings.bind(this);
    this.showRecipeImageHeader = this.showRecipeImageHeader.bind(this);
    this.showRecipeImageThumb = this.showRecipeImageThumb.bind(this);
    this.showEditLink = this.showEditLink.bind(this);
    this.getDomain = this.getDomain.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  updateServings(key, value) {
    if (key === 'servings') {
      if (value > 0) {
        let data = this.state.data;

        let multiplier = value / this.state.data.servings;
        data.servings = value;

        data.ingredients.map((ingredient) => {
          if (ingredient) {
            ingredient.quantity = ingredient.quantity * multiplier;
          }
          return ingredient
        });

        this.setState({
          data: data
        })
      }
    }
  }

  showRecipeImageHeader() {
    if (this.state.data.photo) {
      return (
        <div className="panel-heading hero-image" style={{ backgroundImage: "url("+this.state.data.photo+")"}}>
          <div className="row">
            <div className="col-lg-12">
              <h3>{this.state.data.title}</h3>
              <Ratings stars={ this.state.data.rating }/>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="panel-heading">
          <div className="row">
            <div className="col-lg-12">
              <h3>{this.state.data.title}</h3>
              <Ratings stars={ this.state.data.rating }/>
            </div>
          </div>
        </div>
      );
    }
  }

  showRecipeImageThumb() {
    if (this.state.data.photo_thumbnail) {
      return (
        <img className="img-responsive" src={ this.state.data.photo_thumbnail } />
      );
    } else {
      return (
        <img className="img-responsive" src="/images/default_recipe_image.png" />
      );
    }
  }

  showEditLink() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      edit_recipe: {
        id: 'recipe.edit_recipe',
        description: 'Edit recipe button text',
        defaultMessage: 'Edit recipe'
      }
    });

    if (this.props.user !== null && (this.props.user.id === this.state.data.author)) {
      return (
        <Link to={ "/recipe/edit/" + this.state.data.id }><button className="btn btn-primary btn-sm">{ formatMessage(messages.edit_recipe) }</button></Link>
      )
    }
  }

  // Hack-a-licious!
  getDomain(url) {
    let a = document.createElement('a');
    a.href = url;
    return a.hostname;
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      servings: {
        id: 'recipe.servings',
        description: 'Servings',
        defaultMessage: 'Servings',
      },
      prep_time: {
        id: 'recipe.prep_time',
        description: 'Preparation time',
        defaultMessage: 'Prep time',
      },
      cooking_time: {
        id: 'recipe.cooking_time',
        description: 'Cooking time',
        defaultMessage: 'Cooking time',
      },
      ingredients: {
        id: 'recipe.ingredients',
        description: 'Ingredients',
        defaultMessage: 'Ingredients',
      },
      directions: {
        id: 'recipe.directions',
        description: 'Directions',
        defaultMessage: 'Directions',
      },
      source: {
        id: 'recipe.source',
        description: 'Source of the recipe',
        defaultMessage: 'Source'
      },
      created_by: {
        id: 'recipe.created_by',
        description: 'Created by',
        defaultMessage: 'Created by'
      },
      last_updated: {
        id: 'recipe.last_updated',
        description: 'Last Updated',
        defaultMessage: 'Last Updated'
      },
      minutes: {
        id: 'recipe.minutes',
        description: 'minutes',
        defaultMessage: 'minutes'
      },
    });

    return (
      <div className="recipe-details">
        <div className="panel panel-success">

          { this.showRecipeImageHeader() }

          <div className="recipe-schema" itemType="http://schema.org/Recipe">
            <div className="row">
              <div className="mobile-image">
                <img className="img-responsive" src={ this.state.data.photo } />
              </div>
              <div className="col-sm-7 col-sm-push-5 col-xs-12">
                <div className="panel panel-default">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="active">
                        <th>{ formatMessage(messages.servings) }</th>
                        <th>{ formatMessage(messages.prep_time) }</th>
                        <th>{ formatMessage(messages.cooking_time) }</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Input
                            name="servings"
                            type="number"
                            size="servings-textbox"
                            change={ this.updateServings }
                            value={ this.state.data.servings } />
                        </td>
                        <td>{ this.state.data.prep_time } { formatMessage(messages.minutes) }</td>
                        <td>{ this.state.data.cook_time } { formatMessage(messages.minutes) }</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="panel-body">
                    <p>{ this.state.data.info }</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-5 col-sm-pull-7 col-xs-12">
                <h4>{ formatMessage(messages.ingredients) }</h4>
                <Ingredients data={ this.state.data.ingredients }/>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <h4>{ formatMessage(messages.directions) }</h4>
                <Directions data={ this.state.data.directions }/>
              </div>
            </div>
          </div>

          <div className="panel-footer">
            <div className="row">
              <div className="col-lg-10 col-md-6 col-xs-8">
                { (this.state.data.source) ?
                    <div>{ formatMessage(messages.source) }: <a href={ this.state.data.source }>{ this.getDomain(this.state.data.source) }</a></div>
                  : null
                }
                <div>{ formatMessage(messages.created_by) }: { this.state.data.username }</div>
                <div>{ formatMessage(messages.last_updated) }: { this.state.data.update_date }</div>
              </div>
              <div className="col-lg-2 col-md-6 col-xs-4 pull-right text-right">
                { this.showEditLink() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = injectIntl(RecipeScheme);
