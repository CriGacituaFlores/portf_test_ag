import { apiFetch } from '../services/api';
import { retrieveCredentials, clearCredentials, storeTokens, storeUser } from '../services/storage';
import { authActions, meActions, signupActions, loginActions, rootActions } from '../constants/actions';
import config from '../services/config';

function setMeIsLoading() {
  return {
    type: meActions.SET_ME_IS_LOADING,
    meIsLoading: true,
  };
}

function setMeError(error) {
  return {
    type: meActions.SET_ME_ERROR,
    meError: error,
  };
}

function setMe(me) {
  return {
    type: meActions.SET_ME,
    me,
  };
}

function setLoginIsLoading() {
  return {
    type: loginActions.SET_LOGIN_IS_LOADING,
    loginIsLoading: true,
  };
}

function setLoginError(error) {
  return {
    type: loginActions.SET_LOGIN_ERROR,
    loginError: error,
  };
}

function setLoginHasSucceeded() {
  return {
    type: loginActions.SET_LOGIN_HAS_SUCCEEDED,
    loginHasSucceeded: true,
  };
}

function setSignupIsLoading() {
  return {
    type: signupActions.SET_SIGNUP_IS_LOADING,
    signupIsLoading: true,
  };
}

function setSignupError(error) {
  return {
    type: signupActions.SET_SIGNUP_ERROR,
    signupError: error,
  };
}

function setSignupHasSucceeded() {
  return {
    type: signupActions.SET_SIGNUP_HAS_SUCCEEDED,
    signupHasSucceeded: true,
  };
}

export function setAuthIsLoading() {
  return {
    type: authActions.SET_AUTH_IS_LOADING,
    authIsLoading: true,
  };
}

export function setAuthError(error) {
  return {
    type: authActions.SET_AUTH_ERROR,
    authError: error,
  };
}

export function setAuth(auth) {
  return {
    type: authActions.SET_AUTH,
    auth,
  };
}

function clearAuth() {
  return {
    type: authActions.CLEAR_AUTH,
    auth: null,
  };
}

function clearState() {
  return {
    type: rootActions.CLEAR_STATE
  };
}

export function logIn() {
  return (dispatch, getState) => {
    dispatch(setLoginIsLoading());
    dispatch(setAuthIsLoading());
    const state = getState();
    const request = {
      method: 'POST',
      url: '/auth/oauth/token',
      body: {
        username: state.form.loginForm.values.email,
        password: state.form.loginForm.values.password,
        grant_type: 'password',
        client_id: config.clientId,
        client_secret: config.clientSecret,
      },
    };
    apiFetch(request)
      .then(response => response.body) // TODO: do something with response.headers if needed
      .then((body) => {
        storeTokens(body).then(() => {
          dispatch(setAuth(body));
          const _request = {
            method: 'GET',
            url: '/users/me',
          };
          dispatch(setMeIsLoading());
          apiFetch(_request)
            .then((_response) => { // eslint-disable-line arrow-body-style
              // TODO: do something with response.headers if needed
              return _response.body;
            })
            .then((_body) => {
              storeUser(_body).then(() => {
                dispatch(setMe(_body));
                dispatch(setLoginHasSucceeded());
              }).catch((_err) => {
                dispatch(setMeError(_err));
                dispatch(setLoginError(_err));
              }); // eslint-disable-line no-console
            })
            .catch((_e) => {
              dispatch(setMeError(_e));
              if (_e.message === '403') {
                dispatch(setLoginError({ message: 'Forbiden access' }));
              } else if (_e.message === '401') {
                dispatch(setLoginError({ message: 'Unauthorized user' }));
              } else {
                dispatch(setLoginError({ message: 'Something went wrong getting logged user' }));
              }
            });
        }).catch((err) => {
          dispatch(setAuthError(err));
          dispatch(setLoginError(err));
        }); // eslint-disable-line no-console
      })
      .catch((e) => {
        dispatch(setAuthError(e));
        if (e.message === '403') {
          dispatch(setLoginError({ message: 'Wrong email and/or password' }));
        } else if (e.message === '401') {
          dispatch(setLoginError({ message: 'Authentication data is missing' }));
        } else {
          dispatch(setLoginError({ message: 'Something went wrong with the login try again' }));
        }
      });
  };
}

export function signUp(data) {
  return (dispatch) => {
    dispatch(setSignupIsLoading());
    const request = {
      method: 'POST',
      url: '/users',
      body: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };

    apiFetch(request)
      .then(response => response.body) // TODO: do something with response.headers if needed
      .then(() => {
        dispatch(setSignupHasSucceeded());
      })
      .catch(() => {
        dispatch(setSignupError('Something went wrong with the signup try again'));
      });
  };
}

export function getMe() {
  return (dispatch) => {
    dispatch(setMeIsLoading());
    const _request = {
      method: 'GET',
      url: '/users/me',
    };

    apiFetch(_request)
      .then(_response => _response.body)
      .then((_body) => {
        storeUser(_body).then(() => {
          dispatch(setMe(_body));
        }).catch(() => {
          dispatch(setMeError({ message: 'Something went wrong saving user data' }));
        }); // eslint-disable-line no-console
      })
      .catch(() => {
        dispatch(setMeError({ message: 'Something went wrong getting user data' }));
      });
  };
}

export function removeAuth() {
  return (dispatch) => {
    dispatch(setAuthIsLoading());
    clearCredentials().then(() => {
      dispatch(clearAuth());
      dispatch(clearState());
    }).catch((err) => {
      dispatch(setAuthError(err));
    });
  };
}

export function retreiveAuth() {
  return (dispatch) => {
    dispatch(setAuthIsLoading());
    retrieveCredentials().then((credentials) => {
      if (credentials._id && credentials.access_token) {
        dispatch(setAuth(credentials));
      } else {
        dispatch(setAuthError({ message: 'No credentials available' }));
      }
    }).catch((err) => {
      dispatch(setAuthError(err));
    });
  };
}
