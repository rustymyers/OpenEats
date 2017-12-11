import React from 'react'
import classNames from 'classnames';
import SmoothCollapse from 'react-smooth-collapse';
import queryString from 'query-string';
import Spinner from 'react-spinkit';
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

import { Filter } from './Filter'
import { SearchBar } from './SearchBar'
import ListRecipes from './ListRecipes'
import { Pagination } from './Pagination'
import BrowseActions from '../actions/BrowseActions';
import BrowseStore from '../stores/BrowseStore';
import documentTitle from '../../common/documentTitle'
import { CourseStore, CuisineStore, RatingStore } from '../stores/FilterStores';

require("./../css/browse.scss");

class Browse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      total_recipes: 0,
      show_mobile_filters: false,
      filter: {},
      courses: [],
      cuisines: [],
      ratings: []
    };

    this._onChangeRecipes = this._onChangeRecipes.bind(this);
    this._onChangeCourses = this._onChangeCourses.bind(this);
    this._onChangeCuisines = this._onChangeCuisines.bind(this);
    this._onChangeRatings = this._onChangeRatings.bind(this);
    this.doFilter = this.doFilter.bind(this);
    this.reloadData = this.reloadData.bind(this);
    this.toggleMobileFilters = this.toggleMobileFilters.bind(this);
  }

  _onChangeRecipes() {
    this.setState(BrowseStore.getState());
  }

  _onChangeCourses() {
    this.setState({courses: CourseStore.getState()['data']});
  }

  _onChangeCuisines() {
    this.setState({cuisines: CuisineStore.getState()['data']});
  }

  _onChangeRatings() {
    this.setState({ratings: RatingStore.getState()['data']});
  }

  componentDidMount() {
    BrowseStore.addChangeListener(this._onChangeRecipes);
    CourseStore.addChangeListener(this._onChangeCourses);
    CuisineStore.addChangeListener(this._onChangeCuisines);
    RatingStore.addChangeListener(this._onChangeRatings);

    BrowseActions.browseInit(queryString.parse(this.props.location.search));
  }

  componentWillUnmount() {
    documentTitle();
    BrowseStore.removeChangeListener(this._onChangeRecipes);
    CourseStore.removeChangeListener(this._onChangeCourses);
    CuisineStore.removeChangeListener(this._onChangeCuisines);
    RatingStore.removeChangeListener(this._onChangeRatings);
  }

  componentWillReceiveProps(nextProps) {
    let query = queryString.parse(this.props.location.search);
    let nextQuery = queryString.parse(nextProps.location.search);
    if (query.offset !== nextQuery.offset) {
      BrowseActions.loadRecipes(nextQuery);
    } else if (query.offset !== nextQuery.offset) {
      this.reloadData(nextQuery);
    } else if (query.course !== nextQuery.course) {
      this.reloadData(nextQuery);
    } else if (query.cuisine !== nextQuery.cuisine) {
      this.reloadData(nextQuery);
    } else if (query.rating !== nextQuery.rating) {
      this.reloadData(nextQuery);
    } else if (query.search !== nextQuery.search) {
      this.reloadData(nextQuery);
    }
  }

  reloadData(filters) {
    BrowseActions.loadRecipes(filters);
    BrowseActions.loadCourses(filters);
    BrowseActions.loadCuisines(filters);
    BrowseActions.loadRatings(filters);
  }

  doFilter(name, value) {
    // Get a deep copy of the filter state
    let filters = JSON.parse(JSON.stringify(this.state.filter));
    if (value !== "") {
      filters[name] = value;
    } else {
      delete filters[name];
    }

    if (name !== "offset") {
      filters['offset'] = 0;
    }

    BrowseActions.updateURL(filters)
  }

  toggleMobileFilters() {
    this.setState({show_mobile_filters: !this.state.show_mobile_filters});
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      no_results: {
        id: 'browse.no_results',
        description: 'No results header',
        defaultMessage: 'Sorry, there are no results for your search.',
      }
    });
    documentTitle(this.props.intl.messages['nav.recipes']);

    let header = (
      <span>
        Show Filters
        <span className="glyphicon glyphicon-chevron-down pull-right"/>
      </span>
    );
    if (this.state.show_mobile_filters) {
      header = (
        <span>
          Hide Filters
          <span className="glyphicon glyphicon-chevron-up pull-right"/>
        </span>
      );
    }

    let filters = (
      <div className={ classNames(
          "row",
          "sidebar",
        ) }>
        <div className="col-sm-12 col-xs-4">
          <Filter title="course"
                  data={ this.state.courses }
                  filter={ this.state.filter }
                  doFilter={ this.doFilter }
          />
        </div>
        <div className="col-sm-12 col-xs-4">
          <Filter title="cuisine"
                  data={ this.state.cuisines }
                  filter={ this.state.filter }
                  doFilter={ this.doFilter }
          />
        </div>
        <div className="col-sm-12 col-xs-4">
          <Filter title="rating"
                data={ this.state.ratings }
                filter={ this.state.filter }
                doFilter={ this.doFilter }
          />
        </div>
      </div>
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2 col-xs-12">
            <div className="hidden-xs">
              { filters }
            </div>

            <div className="visible-xs sidebar-header" onClick={ this.toggleMobileFilters }>
              { header }
            </div>
            <div className="visible-xs">
              <SmoothCollapse
                expanded={this.state.show_mobile_filters}
                heightTransition=".5s ease">
                { filters }
              </SmoothCollapse>
            </div>
          </div>
          <div className="col-sm-10 col-xs-12">
            <div className="row">
              <SearchBar format="col-xs-12" value={ this.state.filter.search } filter={ this.doFilter }/>
            </div>
            <div id="browse" className="row">
              {
                this.state.recipes === undefined || this.state.recipes.length == 0 ?
                  <div className="spinner">
                    <h3 className="no-results">{ formatMessage(messages.no_results) }</h3>
                    <Spinner className="spinner-obj" spinnerName="circle" noFadeIn />
                  </div>
                :
                  <ListRecipes
                    format="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                    data={this.state.recipes}
                  />
              }
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Pagination limit={ this.state.filter['limit']}
                            count={ this.state.total_recipes }
                            offset={ this.state.filter['offset'] }
                            filter={ this.doFilter }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = injectIntl(Browse);