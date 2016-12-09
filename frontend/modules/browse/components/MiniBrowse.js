import React from 'react'
import request from 'superagent';

import ListRecipes from './ListRecipes'
import {serverURLs} from '../../common/config'

require("./../css/browse.scss");

export default React.createClass({
  loadRecipesFromServer: function (url) {
    var base_url = serverURLs.mini_browse + url;
    request
      .get(base_url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({data: res.body.results});
        } else {
          console.error(base_url, err.toString());
        }
      })
  },
  getInitialState: function() {
    return { data: [] };
  },
  componentDidMount: function() {
    this.loadRecipesFromServer(this.props.qs);
  },
  render: function() {
    return (
      <ListRecipes format={this.props.format} data={this.state.data} />
    );
  }
});
