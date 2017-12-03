"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Nav from '../components/Nav'
import * as ListActions from '../../list/actions/ListActions'
import * as RandomRecipeActions from '../actions/RandomRecipeActions'

let NavBar = ({ lists, listActions, randomRecipeActions }) => {
  return (
    <Nav
      lists={ lists }
      listActions={ listActions }
      randomRecipeActions={ randomRecipeActions }
    />
)};

NavBar.propTypes = {
  lists: PropTypes.array.isRequired,
  listActions: PropTypes.object.isRequired,
  randomRecipeActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  lists: state.list.lists,
});

const mapDispatchToProps = dispatch => ({
  listActions: bindActionCreators(ListActions, dispatch),
  randomRecipeActions: bindActionCreators(RandomRecipeActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
