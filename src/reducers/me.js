import { meActions, rootActions } from '../constants/actions';

const defaultState = {
  isLoading: false,
  data: null,
  error: null,
};

const meReducer = (state = defaultState, action) => {
  switch (action.type) {
    case meActions.SET_ME_IS_LOADING:
      return {
        ...state,
        isLoading: action.meIsLoading,
        data: state.me || null,
        error: null,
      };
    case meActions.SET_ME_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.meError.message,
      };
    case meActions.SET_ME:
      return {
        ...state,
        isLoading: false,
        data: action.me,
        error: null,
      };
    case meActions.CLEAR_ME:
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

export default meReducer;
