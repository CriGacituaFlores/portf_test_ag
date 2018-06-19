import { apiFetch } from '../services/api';
import { userActions, updateUserActions, createUserActions } from '../constants/actions';

function userIsLoading() {
  return {
    type: userActions.USER_IS_LOADING,
    userIsLoading: true,
  };
}

function userError(error) {
  return {
    type: userActions.USER_ERROR,
    userError: error,
  };
}

function setUser(user) {
  return {
    type: userActions.USER,
    user,
  };
}

export function clearUser() {
  return {
    type: userActions.CLEAR_USER
  };
}

export default function getUser(id) {
  return (dispatch) => {
    dispatch(userIsLoading());
    const _request = {
      method: 'GET',
      url: `/users/${id}`,
    };

    apiFetch(_request)
      .then(_response => _response.body)
      .then((_body) => {
        dispatch(setUser(_body));
      })
      .catch(() => {
        dispatch(userError({ message: 'Something went wrong getting user data' }));
      });
  };
}

function updateUserIsLoading() {
  return {
    type: updateUserActions.UPDATE_USER_IS_LOADING,
    updateUserIsLoading: true,
  };
}

function updateUserError(error) {
  return {
    type: updateUserActions.UPDATE_USER_ERROR,
    updateUserError: error,
  };
}

function updateUserSuccess() {
  return {
    type: updateUserActions.UPDATE_USER_SUCCESS,
    updateUserSuccess: true,
  };
}

export function updateUser(id) {
  return (dispatch, getState) => {
    const state = getState();

    const { values } = state.form.editUser;

    dispatch(updateUserIsLoading());
    const _request = {
      method: 'PUT',
      url: `/users/${id}`,
      body: values
    };

    apiFetch(_request)
      .then(_response => _response.body)
      .then(() => {
        dispatch(updateUserSuccess());
      })
      .catch(() => {
        dispatch(updateUserError({ message: 'Something went wrong getting user data' }));
      });
  };
}

function createUserIsLoading() {
  return {
    type: createUserActions.CREATE_USER_IS_LOADING,
    createUserIsLoading: true,
  };
}

function createUserError(error) {
  return {
    type: createUserActions.CREATE_USER_ERROR,
    createUserError: error,
  };
}

function createUserSuccess() {
  return {
    type: createUserActions.CREATE_USER_SUCCESS,
    createUserSuccess: true,
  };
}

export function clearCreateUser() {
  return {
    type: createUserActions.CLEAR_CREATE_USER
  };
}

export function createNewUser() {
  return (dispatch, getState) => {
    const state = getState();

    const { values } = state.form.createUser;

    dispatch(createUserIsLoading());
    const _request = {
      method: 'POST',
      url: '/users/',
      body: values
    };

    apiFetch(_request)
      .then(_response => _response.body)
      .then(() => {
        dispatch(createUserSuccess());
      })
      .catch(() => {
        dispatch(createUserError({ message: 'Something went wrong getting user data' }));
      });
  };
}

