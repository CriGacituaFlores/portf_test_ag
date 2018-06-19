import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

import CreateForm from './createForm';
import { createNewUser, clearCreateUser } from '../../actions/user';
/**
 * Inline Date Pickers are displayed below the input, rather than as a modal dialog.
 */

class UserCreate extends Component {
  componentWillUpdate(nextProps) {
    if (this.props.createForm && this.props.createForm.values && this.props.createForm.values.firstName !== '' && nextProps.createUser.success) {
      this.props.clearCreateUser();
      this.props.history.push('/team');
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createNewUser();
  }


  render() {
    return (
      <div>
        <Paper style={{ marginTop: 32, padding: 16 }} zDepth={1}>
          <h4>Editar Perfil</h4>
          <CreateForm
            onSubmit={values => this.onSubmit(values)}
            isLoading={this.props.createUser && this.props.createUser.isLoading}
          />
        </Paper>
      </div>
    );
  }
}

UserCreate.propTypes = {
  me: PropTypes.shape({
    data: PropTypes.object
  }).isRequired,
  createNewUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ // eslint-disable-line
  me: state.me,
  createUser: state.createUser,
  createForm: state.form.createUser
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  createNewUser: () => dispatch(createNewUser()),
  clearCreateUser: () => dispatch(clearCreateUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);
