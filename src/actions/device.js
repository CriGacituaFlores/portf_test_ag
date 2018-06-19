import { apiFetch } from '../services/api';
import { deviceActions } from '../constants/actions';

function setDeviceIsLoading() {
  return {
    type: deviceActions.SET_DEVICE_IS_LOADING,
    deviceIsLoading: true,
  };
}

function setDeviceError(error) {
  return {
    type: deviceActions.SET_DEVICE_ERROR,
    deviceError: error,
  };
}

function setDevice(devices) {
  return {
    type: deviceActions.SET_DEVICE,
    devices,
  };
}

export function getDevice(id) {
  return (dispatch) => {
    dispatch(setDeviceIsLoading());
    const _request = {
      method: 'GET',
      url: `/devices/${id}`,
    };

    apiFetch(_request)
      .then(_response => _response.body)
      .then((_body) => {
        dispatch(setDevice(_body));
      })
      .catch(() => {
        dispatch(setDeviceError({ message: 'Something went wrong getting device data' }));
      });
  };
}

function setDeviceListIsLoading() {
  return {
    type: deviceActions.SET_DEVICE_LIST_IS_LOADING,
    deviceListIsLoading: true,
  };
}

function setDeviceListError(error) {
  return {
    type: deviceActions.SET_DEVICE_LIST_ERROR,
    deviceListError: error,
  };
}

function setDeviceList(deviceList) {
  return {
    type: deviceActions.SET_DEVICE_LIST,
    deviceList,
  };
}

export function getDeviceList() {
  return (dispatch) => {
    dispatch(setDeviceListIsLoading());
    const _request = {
      method: 'GET',
      url: '/devices',
    };

    apiFetch(_request)
      .then(_response => _response.body)
      .then((_body) => {
        dispatch(setDeviceList(_body));
      })
      .catch(() => {
        dispatch(setDeviceListError({ message: 'Something went wrong getting device list data' }));
      });
  };
}
