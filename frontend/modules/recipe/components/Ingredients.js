import React from 'react'
import request from 'superagent';

import { serverURLs } from '../../common/config'

export default React.createClass({
  loadRecipeFromServer: function() {
    var url = serverURLs.ingredient + "&recipe="+ this.props.recipe_id;
    request
      .get(url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({ data: res.body.results });
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
    var ingredients = this.state.data.map(function(ingredient) {
      return (
        <li className="ingredient" key={ ingredient.id }>
          { ingredient.quantity }&nbsp;
          { ingredient.measurement }&nbsp;
          { ingredient.title }
        </li>
      );
    });
    return (
      <ul className="ingredients" >
        { ingredients }
      </ul>
    );
  }
});
