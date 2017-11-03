"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Nav from '../components/Nav'
import * as ListActions from '../../list/actions/ListActions'

let NavBar = ({ lists, listActions }) => {
  return (
    <Nav
      lists={ lists }
      listActions={ listActions }
    />
)};

NavBar.propTypes = {
  lists: PropTypes.array.isRequired,
  listActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  lists: state.list.lists,
});

const mapDispatchToProps = dispatch => ({
  listActions: bindActionCreators(ListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
