import { signupActions, rootActions } from '../constants/actions';

const defaultState = {
  isLoading: false,
  hasSucceeded: false,
  error: null,
};

const signupReducer = (state = defaultState, action) => {
  switch (action.type) {
    case signupActions.SET_SIGNUP_IS_LOADING:
      return {
        ...state,
        isLoading: action.signupIsLoading,
        hasSucceeded: false,
        error: null,
      };
    case signupActions.SET_SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        hasSucceeded: null,
        error: action.signupError.message,
      };
    case signupActions.SET_SIGNUP_HAS_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        hasSucceeded: action.signupHasSucceeded,
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

export default signupReducer;
