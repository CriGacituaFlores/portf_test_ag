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
  { text: 'Muvsmart', value: 'Muvsmart' },
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
      floatingLabelText="Equipo"
      value={input.value || defaultSelected}
      onChange={(e, val) => input.onChange(selection[val].value)}
    >
      {selection.map(select => <MenuItem key={select.value} value={select.value} primaryText={select.text} />)}
    </SelectField>
  );
class CreateForm extends Component {
  componentWillMount() {
    if (this.props.id) {
      this.props.getUser(this.props.id);
    }
  }
  render() {
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
                    help: 'Opcional, sólo si el usuario ya tiene días utilizados sino dejarlo en blanco',
                    label: 'Días utilizados (opcional)'
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
                    help: 'Opcional, sólo colocar si es necesario. Los días se calculan automáticamente con la fecha de ingreso.',
                    label: 'Días disponibles (opcional)'
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
                    label: 'Días deuda (opcional)'
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
                    label: 'Días adicionales (opcional)'
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
                  hintText="es locale"
                  locale="es"
                  defaultDate={new Date()}
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
                  label={!this.props.isLoading && 'Crear'}
                  primary
                  type="submit"
                  disabled={!this.props.valid || this.props.isLoading}
                  icon={this.props.isLoading ? <CircularProgress size={24} /> : null}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row >
    );
  }
}

CreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object // eslint-disable-line
};


const createProfileForm = reduxForm({
  form: 'createUser',
})(CreateForm);

const mapStateToProps = (state) => ({ // eslint-disable-line
  me: state.me,
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  getUser: id => dispatch(getUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(createProfileForm);
