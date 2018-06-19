import { fieldActions, rootActions } from '../constants/actions';

const defaultStateList = {
  isLoading: false,
  data: [],
  error: null,
};

const defaultStateSensor = {
  isLoading: false,
  data: [],
  error: null
};

const defaultStateSeDegreedays = {
  isLoading: false,
  data: [],
  error: null
};

export const fieldList = (state = defaultStateList, action) => {
  switch (action.type) {
    case fieldActions.FIELD_LIST_IS_LOADING:
      console.log('FIELD_LIST_IS_LOADING');
      return {
        ...state,
        isLoading: action.fieldListIsLoading,
        data: state.fieldList || null,
        error: null,
      };
    case fieldActions.FIELD_LIST_ERROR:
      console.log('FIELD_LIST_ERROR');
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.fieldListError.message,
      };
    case fieldActions.FIELD_LIST:
      console.log('Field List');
      return {
        ...state,
        isLoading: false,
        data: action.fieldList,
        error: null,
      };
    case fieldActions.CLEAR_FIELD_LIST:
      console.log('CLEAR_FIELD_LIST');
      return {
        ...state,
        isLoading: false,
        data: null,
        error: null,
      };
    case rootActions.CLEAR_STATE:
      console.log('CLEAR_STATE');
      return {
        isLoading: false,
        data: null,
        error: null,
      };
    default:
      // console.log('DEFAULT');
      return state;
  }
};

export const fieldSensors = (state = defaultStateSensor, action) => {
  switch (action.type) {
    case fieldActions.FIELD_SENSOR_IS_LOADING:
      console.log('FIELD_SENSOR_IS_LOADING');
      return {
        ...state,
        isLoading: action.fieldSensorIsLoading,
        data: state.fieldSensor || null,
        error: null,
      };
    case fieldActions.FIELD_SENSOR_ERROR:
      console.log('FIELD_SENSOR_ERROR');
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.fieldSensorError,
      };
    case fieldActions.FIELD_SENSOR:
      console.log('Field SENSOR');
      return {
        ...state,
        isLoading: false,
        data: action.fieldSensors,
        error: null,
      };
    case fieldActions.CLEAR_FIELD_LIST:
      console.log('CLEAR_FIELD_LIST');
      return {
        ...state,
        isLoading: false,
        data: null,
        error: null,
      };
    case rootActions.CLEAR_STATE:
      console.log('CLEAR_STATE');
      return {
        isLoading: false,
        data: null,
        error: null,
      };
    default:
      // console.log('DEFAULT');
      return state;
  }
};

export const fieldDegreedays = (state = defaultStateSeDegreedays, action) => {
  switch (action.type) {
    // fieldDegreedaysIsLoading
    // fieldDegreedaysError
    // fieldDegreedays
    case fieldActions.SET_FIELD_DEGREEDAYS_IS_LOADING:
      console.log('SET_FIELD_DEGREEDAYS_IS_LOADING');
      return {
        ...state,
        isLoading: action.fieldDegreedaysIsLoading,
        data: state.fieldDegreedays || null,
        error: null,
      };
    case fieldActions.SET_FIELD_DEGREEDAYS_ERROR:
      console.log('SET_FIELD_DEGREEDAYS_ERROR');
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.fieldDegreedaysError,
      };
    case fieldActions.SET_FIELD_DEGREEDAYS:
      console.log('SET_FIELD_DEGREEDAYS');
      return {
        ...state,
        isLoading: false,
        data: action.fieldDegreedays,
        error: null,
      };
    case fieldActions.CLEAR_FIELD_DEGREEDAYS:
      console.log('CLEAR_FIELD_DEGREEDAYS');
      return {
        ...state,
        isLoading: false,
        data: null,
        error: null,
      };
    case rootActions.CLEAR_STATE:
      console.log('CLEAR_STATE');
      return {
        isLoading: false,
        data: null,
        error: null,
      };
    default:
      // console.log('DEFAULT');
      return state;
  }
};
