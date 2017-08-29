import React from 'react'
import PropTypes from 'prop-types';
import { request } from '../../common/CustomSuperagent';
import ListRecipes from './ListRecipes'
import { serverURLs } from '../../common/config'

require("./../css/browse.scss");

class MiniBrowse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || []
    };

    this.loadRecipesFromServer = this.loadRecipesFromServer.bind(this);
  }

  loadRecipesFromServer(url) {
    var base_url = serverURLs.mini_browse + url;
    request()
      .get(base_url)
      .end((err, res) => {
        if (!err && res) {
          this.setState({data: res.body.results});
        } else {
          console.error(base_url, err.toString());
        }
      })
  }

  componentDidMount() {
    this.loadRecipesFromServer(this.props.qs);
  }

  render() {
    return (
      <ListRecipes format={this.props.format} data={this.state.data} />
    );
  }
}

MiniBrowse.propTypes = {
  format: PropTypes.string.isRequired,
  qs: PropTypes.string.isRequired
};

module.exports = MiniBrowse;
