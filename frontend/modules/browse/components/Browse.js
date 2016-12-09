import React from 'react'
import request from 'superagent';

import Filter from './Filter'
import SearchBar from './SearchBar'
import ListRecipes from './ListRecipes'
import Pagination from './Pagination'
import { serverURLs } from '../../common/config'

require("./../css/browse.scss");

// Array of default values that should be used when filtering
const DEFAULTS = {
  'limit': 12
};

const REST_FILTERS = [
  'offset'
];

const FILTER_MAP = {
  // frontend filter  :  backend filters
  'offset' : 'offset',
  'limit'  : 'limit',
  'cuisine': 'cuisine__title',
  'course' : 'course__title',
  'search' : 'search'
};

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  init: function() {
    var course = [];
    var cuisine = [];
    request.get(serverURLs.course).type('json')
      .end((err, res) => {
        if (!err && res) {
          course = res.body.results;
          request.get(serverURLs.cuisine).type('json')
            .end((err, res) => {
              if (!err && res) {
                cuisine = res.body.results;
                this.setState({
                  course: course,
                  cuisine: cuisine,
                });
              } else {
                console.error(serverURLs.cuisine, err.toString());
              }
            });
        } else {
          console.error(serverURLs.course, err.toString());
        }
      });
  },

  getRecipes: function(url) {
    url = serverURLs.browse + url;
    request
      .get(url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({
            total_recipes: res.body.count,
            recipes: res.body.results
          });
        } else {
          console.error(url, err.toString());
        }
      });
  },

  getInitialState: function() {
    return {
      recipes: [],
      total_recipes: 0,
      course: [],
      cuisine: [],
    };
  },

  componentDidMount: function() {
    this.init();
    this.buildBackendURL(this.props.location.query);
  },

  componentWillReceiveProps: function(nextProps) {
    this.buildBackendURL(nextProps.location.query);
    window.scrollTo(0, 0);
  },

  filter: function(name, value) {
    var new_filters = this.props.location.query;

    if (value == '' || value == 0) {
      delete new_filters[name];
    } else {
      new_filters[name] = value;
    }

    if (REST_FILTERS.indexOf(name) < 0) {
      for (let filter in REST_FILTERS) {
        delete new_filters[REST_FILTERS[filter]];
      }
    }
    this.buildFrontendURL(new_filters);
  },

  buildFrontendURL: function (query_map) {
    let encode_data = [];
    for (let d in query_map) {
      encode_data.push(encodeURIComponent(d) + '=' + encodeURIComponent(query_map[d]));
    }
    var path = '/browse/';
    if (encode_data.length > 0) {
       path += '?' + encode_data.join('&');
    }
    this.context.router.push(path);
  },

  buildBackendURL: function (query_string) {
    var base_url = '';
    for (let filter in FILTER_MAP) {
      if (query_string[filter]) {
        base_url += "&" + FILTER_MAP[filter] + "=" + query_string[filter];
      }
      else if (DEFAULTS[filter]) {
        base_url += "&" + FILTER_MAP[filter] + "=" + DEFAULTS[filter];
      }
    }
    this.getRecipes(base_url);
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-2 sidebar">
            <div className="sidebar">
              <Filter title="course"
                      data={ this.state.course }
                      active={ this.props.location.query['course'] }
                      filter={ this.filter }
              />
              <Filter title="cuisine"
                      data={ this.state.cuisine }
                      active={ this.props.location.query['cuisine'] }
                      filter={ this.filter }
              />
            </div>
          </div>
          <div className="col-xs-10">
            <div className="row">
              <SearchBar format="col-xs-12" filter={ this.filter }/>
            </div>
            <div id="browse" className="row">
              {
                this.state.recipes === undefined || this.state.recipes.length == 0 ?
                  <h3 className="no-results">Sorry, there are no results for your search.</h3>
                :
                  <ListRecipes format="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                           data={this.state.recipes}/>
              }
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Pagination limit={ this.props.location.query['limit'] ? this.props.location.query['limit'] : DEFAULTS.limit}
                            count={ this.state.total_recipes }
                            offset={ this.props.location.query['offset'] }
                            filter={ this.filter }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
