import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Form, Field, reduxForm } from 'redux-form';
import { RaisedButton, CircularProgress } from 'material-ui';
import MaterialTextInput from '../Form/MaterialTextInput';

const validate = (values) => {
  const errors = {};
  const { email, password } = values;
  if (email && email.length) {
    errors.email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i // eslint-disable-line no-useless-escape
      .test(email) ? null : 'Email inválido';
  } else {
    errors.email = 'El email es obligatorio';
  }
  if (!password || !password.length) {
    errors.password = 'La contraseña es obligatorio';
  }
  return errors;
};

const LoginForm = ({
  handleSubmit,
  valid,
  notification,
  isLoading
}) => (
    <div>
      <h1 style={{ fontWeight: '300', color: '#025db4', textAlign: 'left' }}>Ingresar</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={10}>
            <Field
              name="email"
              component={MaterialTextInput}
              options={{
                type: 'text',
                label: 'Email'
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={10}>
            <Field
              name="password"
              component={MaterialTextInput}
              options={{
                type: 'password',
                label: 'Contraseña'
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <p style={{
              color: 'red', fontSize: 'small', marginTop: 10, marginBottom: 10
            }}
            >
              {notification}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={1} start="lg">
            <RaisedButton
              label={isLoading ? '' : 'Ingresar'}
              primary
              onClick={handleSubmit}
              disabled={!valid}
              icon={isLoading ? <CircularProgress size={24} /> : null}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  notification: PropTypes.string,
  isLoading: PropTypes.bool
};

LoginForm.defaultProps = {
  // me: null,
  // loginError: null,
  isLoading: false,
  notification: ''
};

export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm);
