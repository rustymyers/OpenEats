import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as AuthActions from '../actions/AuthActions'
import LoginForm from '../components/LoginForm'
import history from '../../common/history'

class Login extends React.Component {
  componentDidMount() {
    if (this.props.user.id) {
      history.push('/');
    }
  }

  render() {
    let { user, authActions } = this.props;
    return (
        <LoginForm
          user={ user }
          authActions={ authActions }
        />
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch, props) => ({
  authActions: bindActionCreators(AuthActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
