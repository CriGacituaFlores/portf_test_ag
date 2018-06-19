import { authActions, rootActions } from '../constants/actions';

const defaultState = {
  isLoading: false,
  data: null,
  error: null,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case authActions.SET_AUTH_IS_LOADING:
      return {
        ...state,
        isLoading: action.authIsLoading,
        data: state.auth || null,
        error: null,
      };
    case authActions.SET_AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.authError.message,
      };
    case authActions.SET_AUTH:
      return {
        ...state,
        isLoading: false,
        data: action.auth,
        error: null,
      };
    case authActions.CLEAR_AUTH:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: null,
      };
    case rootActions.CLEAR_STATE:
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

export default authReducer;
