import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AuthStore from '../../account/stores/AuthStore'
import Loading from '../../base/components/Loading'
import RecipeScheme from '../components/RecipeScheme'
import * as RecipeActions from '../actions/RecipeActions'
import * as RecipeItemActions from '../actions/RecipeItemActions'
import bindIndexToActionCreators from '../../common/bindIndexToActionCreators'

require("./../css/recipe.scss");

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: AuthStore.getUser()
    };
  }

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
    this.props.recipeActions.load(this.props.match.params.recipe);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.recipe !== this.props.match.params.recipe) {
      nextProps.recipeItemActions.reset();
      nextProps.recipeActions.load(nextProps.match.params.recipe);
      window.scrollTo(0, 0);
    }
  }

  _onChange = () => {
    this.setState({user: AuthStore.getUser()});
  };

  render() {
    let { lists, recipes, match, status } = this.props;
    let { recipeActions, recipeItemActions } = this.props;
    let data = recipes.find(t => t.id == match.params.recipe);
    if (data) {
      let showEditLink = (this.state.user !== null && this.state.user.id === data.author);
      return (
          <RecipeScheme
            { ...data }
            listStatus={ status }
            lists={ lists }
            showEditLink={ showEditLink }
            recipeActions={ recipeActions }
            recipeItemActions={ recipeItemActions }
          />
      );
    } else {
      return ( <Loading message="Loading"/> )
    }
  }
}

Recipe.propTypes = {
  recipes: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  recipeActions: PropTypes.object.isRequired,
  recipeItemActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  recipes: state.recipe.recipes,
  status: state.recipe.status,
  lists: state.list.lists,
});

const mapDispatchToProps = (dispatch, props) => ({
  recipeItemActions: bindActionCreators(RecipeItemActions, dispatch),
  recipeActions: bindActionCreators(
    bindIndexToActionCreators(RecipeActions, props.match.params.recipe),
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
