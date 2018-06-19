import { loginActions, rootActions } from '../constants/actions';

const defaultState = {
  isLoading: false,
  hasSucceeded: false,
  error: null,
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case loginActions.SET_LOGIN_IS_LOADING:
      return {
        ...state,
        isLoading: action.loginIsLoading,
        hasSucceeded: false,
        error: null,
      };
    case loginActions.SET_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        hasSucceeded: null,
        error: action.loginError.message,
      };
    case loginActions.SET_LOGIN_HAS_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        hasSucceeded: action.loginHasSucceeded,
        error: null,
      };
    case rootActions.CLEAR_STATE:
      return {
        isLoading: false,
        hasSucceeded: null,
        error: null,
      };
    default:
      // console.log('DEFAULT');
      return state;
  }
};

export default loginReducer;
