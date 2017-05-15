import React from 'react'
import { Link } from 'react-router'

import Ratings from '../../recipe/components/Ratings';

require("./../css/list-recipes.scss");

class ListRecipes extends React.Component {
  getRecipeImage(recipe) {
    if (recipe.photo_thumbnail) {
      return recipe.photo_thumbnail;
    } else {
      const images = ['fish', 'fried-eggs', 'pizza', 'soup', 'steak'];
      return '/images/' + images[Math.floor(Math.random(0) * images.length)] + '.png';
    }
  }

  render() {
    const recipes = this.props.data.map((recipe) => {
      const link = '/recipe/' + recipe.id;
      return (
        <div className={ this.props.format } key={ recipe.id }>
          <div className="thumbnail recipe">
            <div className="row">
              <Link to={ link } className="col-sm-12 col-xs-6">
                <img src={ this.getRecipeImage(recipe) } alt={ recipe.title }/>
              </Link>
              <div className="col-sm-12 col-xs-6">
                <div className="caption">
                  <h4><Link to={ link }>{ recipe.title }</Link></h4>
                  <p className="desc">{ recipe.info }</p>
                  <div className="visible-xs">
                    <Ratings stars={ recipe.rating }/>
                    <p className="date">{ recipe.pub_date }</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-xs-12 hidden-xs">
                <div className="ratings">
                  <p className="pull-right date">{ recipe.pub_date }</p>
                  <Ratings stars={ recipe.rating }/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="recipes">
        { recipes }
      </div>
    );
  }
}

ListRecipes.propTypes = {
  format: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired
};

module.exports = ListRecipes;
