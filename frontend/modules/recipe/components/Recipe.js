import React from 'react'
import { Link, browserHistory } from 'react-router'
import { request } from '../../common/CustomSuperagent';
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl'

import AuthStore from '../../account/stores/AuthStore'
import MiniBrowse from '../../browse/components/MiniBrowse'
import { serverURLs } from '../../common/config'
import RecipeScheme from './RecipeScheme'

require("./../css/recipe.scss");

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      user: this.getAuthUser()
    };

    this.loadRecipeFromServer = this.loadRecipeFromServer.bind(this);
    this._onChange = this._onChange.bind(this);
    this.getAuthUser = this.getAuthUser.bind(this);
  }

  loadRecipeFromServer(id) {
    window.scrollTo(0, 0);
    let url = serverURLs.recipe + id + "/";
    request()
      .get(url)
      .end((err, res) => {
        if (!err && res) {
          this.setState({ data: res.body });
        } else {
          if (res.statusCode == 404) {
            browserHistory.replace('/notfound');
          } else {
            console.error(url, err.toString());
          }
        }
      })
  }

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
    this.loadRecipeFromServer(this.props.params.recipe);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    this.loadRecipeFromServer(nextProps.params.recipe);
  }

  _onChange() {
    this.setState({user: this.getAuthUser()});
  }

  getAuthUser() {
    return AuthStore.getUser();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <RecipeScheme data={ this.state.data } user={ this.state.user }/>
          </div>
          <div className="col-md-3">
            <MiniBrowse format="col-md-12 col-sm-6 col-xs-12" qs="?limit=4" />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Recipe;
