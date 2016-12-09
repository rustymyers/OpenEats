import React from 'react'
import request from 'superagent';

import { serverURLs } from '../../common/config'

export default React.createClass({
  loadRecipeFromServer: function() {
    var url = serverURLs.direction + "&recipe="+ this.props.recipe_id;
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
    var ingredients = this.state.data.map(function(direction) {
      return (
        <li className="ingredient" key={ direction.step }>
          { direction.title }
        </li>
      );
    });
    return (
      <ol className="ingredients" >
        { ingredients }
      </ol>
    );
  }
});
