import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton, CircularProgress, DatePicker, SelectField, MenuItem } from 'material-ui';
import areIntlLocalesSupported from 'intl-locales-supported';
import { Form, Field, reduxForm } from 'redux-form';
import { Row, Col } from 'react-flexbox-grid';

import MaterialTextInput from '../Form/MaterialTextInput';

import getUser from '../../actions/user';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['es', 'es-ES'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/es');
}

const Equipos = [
  { text: 'Agrobolt', value: 'Agrobolt' },
  { text: 'Biwil', value: 'Biwil' },
  { text: 'Climo', value: 'Climo' },
  { text: 'Denda', value: 'Denda' },
  { text: 'Transversal', value: 'Transversal' },
  { text: 'Wenu', value: 'Wenu' },
];

const Roles = [
  { text: 'Usuario', value: 'employee' },
  { text: 'Supervisor', value: 'manager' },
  { text: 'Lider', value: 'boss' },
  { text: 'Admin', value: 'admin' },
];

const RenderDatePicker = ({
  input, label, meta: { touched, error }, defaultDate, ...custom
}) => (
  <DatePicker
    onChange={(e, val) => input.onChange(val)}
    {...custom}
    value={input.value || defaultDate}
  />
);

const RenderSelect = ({
  input, label, meta: { touched, error }, selection, defaultSelected, ...custom
}) => (
  <SelectField
    floatingLabelText={label || 'Equipo'}
    value={input.value || defaultSelected}
    onChange={(e, val) => input.onChange(selection[val].value)}
  >
    {selection.map(select => <MenuItem key={select.value} value={select.value} primaryText={select.text} />)}
  </SelectField>
);
class EditForm extends Component {
  componentWillMount() {
    if (this.props.id) {
      this.props.getUser(this.props.id);
    }
  }
  render() {
    if (this.props.user && this.props.user.data && this.props.user.data._id === this.props.id) {
      return (
        <Row style={{ marginTop: 24, height: '100%', alignItems: 'stretch' }}>
          <Col xs={12} sm={12} md={4} lg={4}>
            <Form onSubmit={this.props.onSubmit}>
              <Row>
                <Col xs={12} md={12}>
                  <Field
                    name="firstName"
                    component={MaterialTextInput}
                    options={{
                      type: 'text',
                      hint: 'Nombre',
                      label: 'Nombre'
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <Field
                    name="lastName"
                    component={MaterialTextInput}
                    options={{
                      type: 'text',
                      hint: 'Apellido',
                      label: 'Apellido'
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <Field
                    name="email"
                    component={MaterialTextInput}
                    options={{
                      type: 'text',
                      hint: 'Email',
                      label: 'Email'
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <Field
                    name="usedDays"
                    component={MaterialTextInput}
                    options={{
                      type: 'number',
                      hint: 'Días utilizados',
                      label: 'Días utilizados'
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <Field
                    name="availableDays"
                    component={MaterialTextInput}
                    options={{
                      type: 'number',
                      hint: 'Días disponibles',
                      label: 'Días disponibles'
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <Field
                    name="debtDays"
                    component={MaterialTextInput}
                    options={{
                      type: 'number',
                      hint: 'Días deuda',
                      label: 'Días deuda'
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <Field
                    name="aditionalDays"
                    component={MaterialTextInput}
                    options={{
                      type: 'number',
                      hint: 'Días adicionales',
                      label: 'Días adicionales'
                    }}
                  />
                </Col>
              </Row>
              {this.props.me.data && this.props.me.data.role === 'admin' &&
                <Row>
                  <Col xs={12} md={12}>
                    <Field
                      name="team"
                      component={RenderSelect}
                      selection={Equipos}
                      defaultSelected={this.props.user.data && this.props.user.data.team}
                    />
                  </Col>
                </Row>
              }
              {this.props.me.data && this.props.me.data.role === 'admin' &&
                <Row>
                  <Col xs={12} md={12}>
                    <Field
                      name="role"
                      label="Rol"
                      component={RenderSelect}
                      selection={Roles}
                      defaultSelected={this.props.user.data && this.props.user.data.role}
                    />
                  </Col>
                </Row>
              }
              <Row>
                <Col xs={12} md={12}>
                  <Field
                    component={RenderDatePicker}
                    floatingLabelText="Fecha de Ingreso"
                    name="joined"
                    locale="es"
                    defaultDate={this.props.user.data && this.props.user.data.joined && new Date(this.props.user.data.joined.toString())}
                    DateTimeFormat={DateTimeFormat}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={4}>
                  <p style={{
                    color: 'red', fontSize: 'small', marginTop: 10, marginBottom: 10
                  }}
                  >{this.props.notification}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={1} start="lg">
                  <RaisedButton
                    label="Actualizar"
                    primary
                    type="submit"
                    disabled={!this.props.valid || this.props.updateUser.isLoading}
                    icon={this.props.updateUser.isLoading ? <CircularProgress size={24} /> : null}
                  />
                </Col>
              </Row>
            </Form>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={8}
            lg={8}
            style={{
              borderLeftWidth: 1, borderLeftColor: '#666', borderLeftStyle: 'dotted', padding: 20, backgroundColor: '#efefef'
            }}
          >
            <Row style={{ padingLeft: 40 }}>
              <h1>{this.props.user.data.profile.firstName} {this.props.user.data.profile.lastName}</h1>
            </Row>
          </Col>
        </Row >
      );
    }

    return (<div>No hay datos</div>);
  }
}

EditForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object // eslint-disable-line
};


const editProfileForm = reduxForm({
  form: 'editUser'
})(EditForm);

const mapStateToProps = (state) => {
  let initialValues = {};
  if (state.user && state.user.data && state.user.data.profile) {
    initialValues = {
      firstName: state.user.data.profile.firstName,
      lastName: state.user.data.profile.lastName,
      email: state.user.data.email,
      usedDays: state.user.data.usedDays.toString(),
      availableDays: state.user.data.availableDays.toString(),
      debtDays: state.user.data.debtDays.toString(),
      joined: new Date(state.user.data.joined.toString()),
      aditionalDays: state.user.data.aditionalDays.toString(),
      team: state.user.data.team
    };
  }
  return ({ // eslint-disable-line
    me: state.me,
    user: state.user,
    updateUser: state.updateUser,
    initialValues
  });
};

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  getUser: id => dispatch(getUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(editProfileForm);
