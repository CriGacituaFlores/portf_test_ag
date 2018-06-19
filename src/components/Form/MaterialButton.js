import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';

const MaterialButton = ({
  label,
  primary,
  onClick
}) => (
  <RaisedButton
    label={label}
    primary={primary}
    onClick={onClick}
  />
);

MaterialButton.propTypes = {
  label: PropTypes.string.isRequired,
  primary: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default MaterialButton;
