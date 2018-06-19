import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';

/**
 * Input Props
 * The props under the input key are what connects your input component
 * to Redux and are meant to be destructured into your <input/> component.
 *
 * input.checked : boolean [optional]
 * An alias for value only when value is a boolean. Provided for convenience
 * of destructuring the whole field object into the props of a form element.
 *
 * input.name : String
 * When nested in FormSection, returns the name prop prefixed with the
 * FormSection name. Otherwise, returns the name prop that you passed in.
 *
 * input.onBlur(eventOrValue) : Function
 * A function to call when the form field loses focus. It expects to either
 * receive the React SyntheticEvent or the current value of the field.
 *
 * input.onChange(eventOrValue) : Function
 * A function to call when the form field is changed. It expects to either
 * receive the React SyntheticEvent or the new value of the field.
 *
 * input.onDragStart(event) : Function
 * A function to call when the form field receives a dragStart event. Saves
 * the field value in the event for giving the field it is dropped into.
 *
 * input.onDrop(event) : Function
 * A function to call when the form field receives a drop event.
 *
 * input.onFocus(event) : Function
 * A function to call when the form field receives focus.
 *
 * input.value: any
 * The value of this form field. It will be a boolean for checkboxes, and a string
 * for all other input types. If there is no value in the Redux state for this
 * field, it will default to ''. This is to ensure that the input is controlled.
 * If you require that the value be of another type (e.g. Date or Number), you must
 * provide initialValues to your form with the desired type of this field.
 *
 * Meta Props
 * The props under the meta key are metadata about the state of this field that
 * redux-form is tracking for you.
 *
 * meta.active : boolean
 * true if this field currently has focus. It will only work if you are passing
 * onFocus to your input element.
 *
 * meta.autofilled : boolean
 * true if this field has been set with the AUTOFILL action and has not since been
 * changed with a CHANGE action. This is useful to render the field in a way that
 * the user can tell that the value was autofilled for them.
 *
 * meta.asyncValidating : boolean
 * true if the form is currently running asynchronous validation because this field was blurred.
 *
 * meta.dirty : boolean
 * true if the field value has changed from its initialized value. Opposite of pristine.
 *
 * meta.dispatch : Function
 * The Redux dispatch function.
 *
 * meta.error : String [optional]
 * The error for this field if its value is not passing validation. Both synchronous,
 * asynchronous, and submit validation errors will be reported here.
 *
 * meta.form : String
 * The name of the form. Could be useful if you want to manually dispatch actions.
 *
 * meta.initial : any
 * The initial value of the field.
 *
 * meta.invalid : boolean
 * true if the field value fails validation (has a validation error). Opposite of valid.
 *
 * meta.pristine : boolean
 * true if the field value is the same as its initialized value. Opposite of dirty.
 *
 * meta.submitting : boolean
 * true if the field is currently being submitted
 *
 * meta.submitFailed : boolean
 * true if the form had onSubmit called and failed to submit for any reason. A subsequent
 * successful submit will set it back to false.
 *
 * meta.touched : boolean
 * true if the field has been touched. By default this will be set when the field is blurred.
 *
 * meta.valid : boolean
 * true if the field value passes validation (has no validation errors). Opposite of invalid.
 *
 * meta.visited: boolean
 * true if this field has ever had focus. It will only work if you are passing onFocus
 * to your input element.
 *
 * meta.warning : String [optional]
 * The warning for this field if its value is not passing warning validation.
 *
 */
const MaterialTextInput = ({
  input,
  meta,
  options,
  style,
  initialValue,
  value,
}) => (
  <div>
    <TextField
      style={{
        width: '100%',
        backgroundColor: 'white',
        ...style
      }}
      hintText={options.hint}
      floatingLabelText={options.label}
      type={options.type}
      name={input.name}
      errorText={meta.dirty && meta.error}
      onChange={input.onChange}
      value={input.value || value || meta.initial || initialValue || ''}
    />
    <p style={{ fontSize: 12 }}>{options.help}</p>
  </div>
);


MaterialTextInput.propTypes = {
  options: PropTypes.shape({
    type: PropTypes.string.isRequired,
    hint: PropTypes.string,
    label: PropTypes.string.isRequired,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string
  }).isRequired,
  style: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

MaterialTextInput.defaultProps = {
  style: {}
};

export default MaterialTextInput;
