
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm } from 'redux-form';
import { Grid, Row, Col } from 'react-flexbox-grid';
import MaterialTextInput from './MaterialTextInput';
import MaterialButton from './MaterialButton';

class MaterialReduxForm extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.id;
  }

  render() {
    return (
      <Grid>
        <Form id={this.props.id} onSubmit={this.props.onSubmit}>
          <Row>
            <Col xs={12} mdOffset={4} md={4}>
              <h3>{this.props.title}</h3>
            </Col>
          </Row>
          {this.props.fields.map(field => (
            <Row key={field.id}>
              <Col xs={12} mdOffset={4} md={4}>
                <Field
                  name={field.name}
                  component={MaterialTextInput}
                  onChange={field.onChange}
                  validate={field.validate}
                  options={{
                    type: field.type,
                    hint: field.hint,
                    label: field.label
                  }}
                />
              </Col>
            </Row>
          ))}
          <Row>
            <Col xs={12} mdOffset={4} md={4}>
              {this.props.actions.map(action => (
                <MaterialButton
                  key={action.id}
                  label={action.label}
                  primary={action.primary}
                  onClick={action.onClick}
                />
              ))}
            </Col>
          </Row>
        </Form>
      </Grid>
    );
  }
}

MaterialReduxForm.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      onChange: PropTypes.func,
      validate: PropTypes.func,
      type: PropTypes.string,
      hint: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.object
  )
};

MaterialReduxForm.defaultProps = {
  actions: null
};

export default reduxForm({
  form: 'hola'
})(MaterialReduxForm);
