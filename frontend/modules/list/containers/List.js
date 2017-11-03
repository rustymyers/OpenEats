"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import authCheckRedirect from '../../common/authCheckRedirect'
import GroceryList from '../components/GroceryList'
import * as ListActions from '../actions/ListActions'

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    authCheckRedirect();
    this.props.listActions.load();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lists.length > 0 && nextProps.match.params.listId) {
      if (!(nextProps.lists.find(t => t.id == nextProps.match.params.listId))) {
        this.props.history.push('/list/');
      }
    }
  }

  render() {
    let { match, lists, listActions } = this.props;
    return (
      <GroceryList
        lists={ lists }
        activeListID={ match.params.listId }
        listActions={ listActions }
      />
    )
  }
}

List.propTypes = {
  lists: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  listActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  lists: state.list.lists,
  error: state.list.error,
});

const mapDispatchToProps = dispatch => ({
  listActions: bindActionCreators(ListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
