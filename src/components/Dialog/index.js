import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { approveVacation } from '../../actions/vacation';

class DialogConfirm extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleApprove = () => {
    this.props.approveVacation(this.props.id, this.props.type);
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label={this.props.cancelText}
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={this.props.okText}
        primary
        onClick={this.handleApprove}
      />,
    ];

    return (
      <div>
        <span onClick={this.handleOpen}>
          {this.props.children}
        </span>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <h2 style={{ marginBottom: 20 }}>Confirmar</h2>
          {this.props.text}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  approveVacationState: state.approveVacation
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  approveVacation: (id, state) => dispatch(approveVacation(id, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogConfirm);
