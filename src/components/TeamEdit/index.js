import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

import EditForm from './editForm';
import { updateUser } from '../../actions/user';
/**
 * Inline Date Pickers are displayed below the input, rather than as a modal dialog.
 */

class UserEdit extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.updateUser(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <Paper style={{ marginTop: 32, padding: 16 }} zDepth={1}>
          <h4>Editar Perfil</h4>
          <EditForm
            id={this.props.match.params.id}
            userProfile={this.props.me}
            onSubmit={values => this.onSubmit(values)}
          />
        </Paper>
      </div>
    );
  }
}

UserEdit.propTypes = {
  me: PropTypes.shape({
    data: PropTypes.object
  }).isRequired
};

const mapStateToProps = (state) => ({ // eslint-disable-line
  me: state.me,
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  updateUser: id => dispatch(updateUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
