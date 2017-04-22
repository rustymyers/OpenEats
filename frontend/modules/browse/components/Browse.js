import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

import { Filter } from './Filter'
import SearchBar from './SearchBar'
import ListRecipes from './ListRecipes'
import Pagination from './Pagination'
import BrowseActions from '../actions/BrowseActions';
import BrowseStore from '../stores/BrowseStore';
import { CourseStore, CuisineStore, RatingStore } from '../stores/FilterStores';

require("./../css/browse.scss");

// Array of default values that should be used when filtering
const DEFAULTS = {
  'limit': 12
};

export default injectIntl(React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      recipes: [],
      total_recipes: 0,
      filter: {
        limit: DEFAULTS.limit
      },
      courses: [],
      cuisines: [],
      ratings: []
    };
  },

  _onChangeRecipes: function() {
    this.setState(BrowseStore.getState());

    let encode_data = [];
    for (let key in this.state.filter) {
      if (this.state.filter[key]) {
        encode_data.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.filter[key]));
      }
    }

    let path = '/browse/';
    if (encode_data.length > 0) {
       path += '?' + encode_data.join('&');
    }
    
    this.context.router.push(path);
  },

  _onChangeCourses: function() {
    this.setState({courses: CourseStore.getState()['data']});
  },

  _onChangeCuisines: function() {
    this.setState({cuisines: CuisineStore.getState()['data']});
  },

  _onChangeRatings: function() {
    this.setState({ratings: RatingStore.getState()['data']});
  },

  componentDidMount: function() {
    BrowseStore.addChangeListener(this._onChangeRecipes);
    CourseStore.addChangeListener(this._onChangeCourses);
    CuisineStore.addChangeListener(this._onChangeCuisines);
    RatingStore.addChangeListener(this._onChangeRatings);

    if (Object.keys(this.props.location.query).length > 0) {
      for (let key in this.props.location.query) {
        this.state.filter[key] = this.props.location.query[key];
      }
    }

    BrowseActions.loadRecipes(this.state.filter);
    BrowseActions.loadCourses(this.state.filter);
    BrowseActions.loadCuisines(this.state.filter);
    BrowseActions.loadRatings(this.state.filter);
  },

  componentWillUnmount: function() {
    BrowseStore.removeChangeListener(this._onChangeRecipes);
    CourseStore.removeChangeListener(this._onChangeCourses);
    CuisineStore.removeChangeListener(this._onChangeCuisines);
    RatingStore.removeChangeListener(this._onChangeRatings);
  },

  doFilter: function(name, value) {
    if (value !== "") {
      this.state.filter[name] = value;  
    } else {
      delete this.state.filter[name];
    }
    
    BrowseActions.loadRecipes(this.state.filter);

    if (name !== 'courses') {
      BrowseActions.loadCourses(this.state.filter);
    }

    if (name !== 'cuisines') {
      BrowseActions.loadCuisines(this.state.filter);
    }

    if (name !== 'ratings') {
      BrowseActions.loadRatings(this.state.filter);
    }
  },

  render: function() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      no_results: {
        id: 'browse.no_results',
        description: 'No results header',
        defaultMessage: 'Sorry, there are no results for your search.',
      }
    });

    return (
      <div className="container">
        <div className="row">
          <div className="sidebar col-sm-2 hidden-xs">
            <div className="sidebar">
              <Filter title="course"
                      data={ this.state.courses }
                      filter={ this.state.filter }
                      doFilter={ this.doFilter }
              />
              <Filter title="cuisine"
                      data={ this.state.cuisines }
                      filter={ this.state.filter }
                      doFilter={ this.doFilter }
              />
              <Filter title="rating"
                      data={ this.state.ratings }
                      filter={ this.state.filter }
                      doFilter={ this.doFilter }
              />
            </div>
          </div>
          <div className="col-sm-10 col-xs-12">
            <div className="row">
              <SearchBar format="col-xs-12" filter={ this.doFilter }/>
            </div>
            <div id="browse" className="row">
              {
                this.state.recipes === undefined || this.state.recipes.length == 0 ?
                  <h3 className="no-results">{ formatMessage(messages.no_results) }</h3>
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
                            filter={ this.doFilter }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}));
