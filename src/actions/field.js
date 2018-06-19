import { apiFetch } from '../services/api';
import { fieldActions } from '../constants/actions';

function setFieldIsLoading() {
  return {
    type: fieldActions.FIELD_IS_LOADING,
    fieldIsLoading: true,
  };
}

function setFieldError(error) {
  return {
    type: fieldActions.FIELD_ERROR,
    fieldError: error,
  };
}

function setField(field) {
  return {
    type: fieldActions.FIELD,
    field,
  };
}

export function clearField() {
  return {
    type: fieldActions.CLEAR_FIELD
  };
}

export function getField(id) {
  return (dispatch) => {
    dispatch(setFieldIsLoading());
    const _request = {
      method: 'GET',
      url: `/fields/${id}`,
    };

    apiFetch(_request)
      .then(_response => _response.body)
      .then((_body) => {
        dispatch(setField(_body));
      })
      .catch(() => {
        dispatch(setFieldError({ message: 'Something went wrong getting field data' }));
      });
  };
}

function setFieldListIsLoading() {
  return {
    type: fieldActions.FIELD_LIST_IS_LOADING,
    fieldIsLoading: true,
  };
}

function setFieldListError(error) {
  return {
    type: fieldActions.FIELD_LIST_ERROR,
    fieldListError: error,
  };
}

function setFieldList(fieldList) {
  return {
    type: fieldActions.FIELD_LIST,
    fieldList,
  };
}

export function clearFieldList() {
  return {
    type: fieldActions.CLEAR_FIELD_LIST
  };
}

export function getFieldList() {
  return (dispatch) => {
    dispatch(setFieldListIsLoading());
    const _request = {
      method: 'GET',
      url: '/fields/',
    };

    apiFetch(_request)
      .then(_response => _response.body)
      .then((_body) => {
        dispatch(setFieldList(_body));
      })
      .catch((e) => {
        dispatch(setFieldListError({ error: e, message: 'Something went wrong getting field data' }));
      });
  };
}

/* *****************************
 * GET FIELD SENSORS
 **************************** */

function fieldSensorIsLoading() {
  return {
    type: fieldActions.FIELD_SENSOR_IS_LOADING,
    fieldIsLoading: true,
  };
}

function fieldSensorError(error) {
  return {
    type: fieldActions.FIELD_SENSOR_ERROR,
    fieldError: error,
  };
}

function setFieldSensor(fieldSensors) {
  return {
    type: fieldActions.FIELD_SENSOR,
    fieldSensors,
  };
}

export function clearFieldSensor() {
  return {
    type: fieldActions.CLEAR_FIELD_SENSOR
  };
}

export function getFieldSensor(id) {
  return (dispatch) => {
    dispatch(fieldSensorIsLoading());
    const _request = {
      method: 'GET',
      url: `/fields/${id}/sensors`,
    };

    console.log(_request);

    apiFetch(_request)
      .then(_response => _response.body)
      .then((_body) => {
        console.log(_body);
        dispatch(setFieldSensor(_body));
      })
      .catch(() => {
        dispatch(fieldSensorError({ message: 'Something went wrong getting field data' }));
      });
  };
}

function setFieldDegreedaysIsLoading() {
  return {
    type: fieldActions.SET_FIELD_DEGREEDAYS_IS_LOADING,
    fieldDegreedaysIsLoading: true,
  };
}

function setFieldDegreedaysError(error) {
  return {
    type: fieldActions.SET_FIELD_DEGREEDAYS_ERROR,
    fieldDegreedaysError: error,
  };
}

function setFieldDegreedays(fieldDegreedays) {
  return {
    type: fieldActions.SET_FIELD_DEGREEDAYS,
    fieldDegreedays,
  };
}

export function clearFieldDegreedays() {
  return {
    type: fieldActions.CLEAR_FIELD_DEGREEDAYS
  };
}

export function getFieldDegreedays(id, initDate, finishDate) {
  return (dispatch) => {
    dispatch(setFieldDegreedaysIsLoading());
    const _request = {
      method: 'GET',
      url: `/fields/${id}/${initDate}/${finishDate}`,
    };

    apiFetch(_request)
      .then(_response => _response.body)
      .then((_body) => {
        dispatch(setFieldDegreedays(_body));
      })
      .catch(() => {
        dispatch(setFieldDegreedaysError({ message: 'Something went wrong getting fielddegree days data' }));
      });
  };
}
