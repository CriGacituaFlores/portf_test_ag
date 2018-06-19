import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import { logIn } from '../../actions/auth';

import LoginReduxForm from '../../components/Login/LoginReduxForm';

class Login extends Component {
  componentDidUpdate() {
    if (this.props.login && this.props.login.hasSucceeded) {
      this.props.history.push('/home');
    }
  }

  handleSubmit = () => {
    this.props.logIn();
  }

  render() {
    return (
      <Paper style={{ padding: 20 }}>
        <LoginReduxForm
          handleSubmit={this.handleSubmit}
          notification={this.props.login.error}
          isLoading={this.props.login.isLoading}
        />
      </Paper>
    );
  }
}

Login.propTypes = {
  login: PropTypes.shape({
    isLoading: PropTypes.bool,
    hasSucceeded: PropTypes.bool,
    error: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  logIn: PropTypes.func.isRequired
};

Login.defaultProps = {
  login: {
    isLoading: false,
    hasSucceeded: false,
    error: null,
  }
};

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  logIn: () => dispatch(logIn())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
