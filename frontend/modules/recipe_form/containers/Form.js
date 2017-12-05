import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AuthStore from '../../account/stores/AuthStore'
import * as RecipeFormActions from '../actions/RecipeFormActions'
import * as RecipeGroupActions from '../actions/RecipeGroupActions'
import * as RecipeListActions from '../actions/RecipeListActions'
import * as StatusActions from '../actions/StatusActions'
import bindIndexToActionCreators from '../../common/bindIndexToActionCreators'

import Loading from '../../base/components/Loading'
import RecipeForm from '../components/RecipeForm'

class From extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: AuthStore.getUser()
    };
  }

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
    window.scrollTo(0, 0);
    this.props.recipeGroupActions.fetchCuisines();
    this.props.recipeGroupActions.fetchCourses();
    this.props.recipeGroupActions.fetchTags();
    if (this.props.match.params.id) {
      this.props.recipeFormActions.load(this.props.match.params.id);
    } else {
      this.props.recipeFormActions.create()
    }
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
    this.props.statusActions.close();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id != this.props.match.params.id) {
      window.scrollTo(0, 0);
      nextProps.statusActions.close();
      if (nextProps.match.params.id && !this.props.form.find(t => t.id == nextProps.match.params.id)) {
        nextProps.recipeFormActions.load(nextProps.match.params.id);
      } else {
        nextProps.recipeFormActions.create()
      }
    }
  }

  _onChange = () => {
    this.setState({user: AuthStore.getUser()});
  };

  render() {
    let { tags, courses, cuisines, form, status } = this.props;
    let {
      recipeGroupActions,
      recipeFormActions,
      statusActions
    } = this.props;
    let id = this.props.match.params.id || 0;
    let selectForm = form.find(t => t.id == id);
    if (selectForm) {
      return (
          <RecipeForm
            tags={ tags }
            courses={ courses }
            cuisines={ cuisines }
            status={ status }
            form={ selectForm }
            statusActions={ statusActions }
            recipeGroupActions={ recipeGroupActions }
            recipeFormActions={ recipeFormActions }
            recipeListActions={ RecipeListActions }
          />
      );
    } else {
      return ( <Loading message="Loading"/> )
    }
  }
}

From.propTypes = {
  tags: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  cuisines: PropTypes.array.isRequired,
  status: PropTypes.object.isRequired,
  form: PropTypes.array.isRequired,
  statusActions: PropTypes.object.isRequired,
  recipeGroupActions: PropTypes.object.isRequired,
  recipeFormActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  form: state.recipeForm.form,
  status: state.recipeForm.status,
  tags: state.recipeForm.recipeGroups.tags,
  courses: state.recipeForm.recipeGroups.courses,
  cuisines: state.recipeForm.recipeGroups.cuisines,
});

const mapDispatchToProps = (dispatch, props) => ({
  recipeGroupActions: bindActionCreators(RecipeGroupActions, dispatch),
  statusActions: bindActionCreators(StatusActions, dispatch),
  recipeFormActions: bindActionCreators(
    bindIndexToActionCreators(
      RecipeFormActions,
      props.match.params.id || 0
    ),
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(From);
