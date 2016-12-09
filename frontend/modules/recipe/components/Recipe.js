import React from 'react'
import request from 'superagent';

import MiniBrowse from '../../browse/components/MiniBrowse'
import { serverURLs } from '../../common/config'
import Ingredients from './Ingredients'
import Directions from './Directions'
import Ratings from './Ratings'

require("./../css/recipe.scss");

export default React.createClass({
  loadRecipeFromServer: function() {
    var url = serverURLs.recipe + this.props.params.recipe + "/?format=json";
    request
      .get(url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({ data: res.body });
        } else {
          console.error(url, err.toString());
        }
      })
  },
  getInitialState: function() {
    return { data: [] };
  },
  componentDidMount: function() {
    this.loadRecipeFromServer();
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-9">
            <RecipeScheme data={this.state.data} recipe_id={ this.props.params.recipe }/>
          </div>
          <div className="col-xs-3">
            <MiniBrowse format="col-xs-12" qs="&limit=3" />
          </div>
        </div>
      </div>
    );
  }
});

var RecipeScheme = React.createClass({
  render: function() {
    return (
      <div className="recipe-details">
        <h1 className="title">{this.props.data.title}</h1>
        <img className=" banner-img img-responsive" src={this.props.data.photo}/>
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3>{this.props.data.title}</h3>
          </div>
          <div className="recipe-schema" itemType="http://schema.org/Recipe">

            <div className="row">
              <div className="col-xs-8">
                <div className="row misc">
                  <div className="col-xs-4 item">
                    <p className="header">Cooking Time</p>
                    <p className="body">{ this.props.data.cook_time }</p>
                  </div>
                  <div className="col-xs-4 item middle">
                    <p className="header">Prep Time</p>
                    <p className="body">{ this.props.data.prep_time }</p>
                  </div>
                  <div className="col-xs-4 item">
                    <p className="header">Servings</p>
                    <p className="body">{ this.props.data.servings }</p>
                  </div>
                </div>

                <div className="desc">
                  <h4>Ingredients</h4>
                  <Ingredients recipe_id={ this.props.recipe_id }/>
                </div>
              </div>

              <div className="col-xs-4">
                <div className="ratings">
                  <img src={this.props.data.photo_thumbnail} className="img-responsive" alt="Generic placeholder thumbnail"/>
                  <Ratings stars={ this.props.data.rating }/>
                </div>
              </div>
            </div>

            <div className="desc">
              <h4>Instructions</h4>
              <Directions recipe_id={ this.props.recipe_id }/>
            </div>
          </div>
          <div className="panel-footer">
            <p>{ this.props.data.info }</p>
          </div>
        </div>
      </div>
    );
  }
});
