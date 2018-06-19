import { teamActions, rootActions } from '../constants/actions';

const defaultState = {
  isLoading: false,
  data: [],
  error: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case teamActions.TEAM_IS_LOADING:
      return {
        ...state,
        isLoading: action.teamIsLoading,
        data: state.team || null,
        error: null,
      };
    case teamActions.TEAM_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.teamError.message,
      };
    case teamActions.TEAM:
      return {
        ...state,
        isLoading: false,
        data: action.team,
        error: null,
      };
    case teamActions.CLEAR_TEAM:
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
      return state;
  }
};
