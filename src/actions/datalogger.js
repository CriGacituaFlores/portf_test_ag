import { apiFetch } from '../services/api';
import { dataloggerActions } from '../constants/actions';

function setDataloggerIsLoading() {
  return {
    type: dataloggerActions.SET_DATALOGGER_IS_LOADING,
    dataloggerIsLoading: true,
  };
}

function setDataloggerError(error) {
  return {
    type: dataloggerActions.SET_DATALOGGER_ERROR,
    dataloggerError: error,
  };
}

function setDatalogger(dataloggers) {
  return {
    type: dataloggerActions.SET_DATALOGGER,
    dataloggers,
  };
}

export function getDatalogger(id) {
  return (dispatch) => {
    dispatch(setDataloggerIsLoading());
    const _request = {
      method: 'GET',
      url: `/dataloggers/${id}`,
    };

    apiFetch(_request)
      .then(_response => _response.body)
      .then((_body) => {
        dispatch(setDatalogger(_body));
      })
      .catch(() => {
        dispatch(setDataloggerError({ message: 'Something went wrong getting datalogger data' }));
      });
  };
}

function setDataloggerListIsLoading() {
  return {
    type: dataloggerActions.SET_DATALOGGER_LIST_IS_LOADING,
    dataloggerListIsLoading: true,
  };
}

function setDataloggerListError(error) {
  return {
    type: dataloggerActions.SET_DATALOGGER_LIST_ERROR,
    dataloggerListError: error,
  };
}

function setDataloggerList(dataloggerList) {
  return {
    type: dataloggerActions.SET_DATALOGGER_LIST,
    dataloggerList,
  };
}

export function getDataloggerList() {
  return (dispatch) => {
    dispatch(setDataloggerListIsLoading());
    const _request = {
      method: 'GET',
      url: '/dataloggers',
    };

    apiFetch(_request)
      .then(_response => _response.body)
      .then((_body) => {
        dispatch(setDataloggerList(_body));
      })
      .catch(() => {
        dispatch(setDataloggerListError({ message: 'Something went wrong getting datalogger list data' }));
      });
  };
}
