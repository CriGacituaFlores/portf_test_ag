import { userActions, updateUserActions, createUserActions, rootActions } from '../constants/actions';

const defaultState = {
  isLoading: false,
  data: [],
  error: null,
};

const defaultStateUpdate = {
  isLoading: false,
  success: false,
  error: null,
};

const defaultStateCreate = {
  isLoading: false,
  success: false,
  error: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case userActions.USER_IS_LOADING:
      console.log('USER_IS_LOADING');
      return {
        ...state,
        isLoading: action.userIsLoading,
        data: state.user || null,
        error: null,
      };
    case userActions.USER_ERROR:
      console.log('USER_ERROR');
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.userError.message,
      };
    case userActions.USER:
      console.log('user');
      return {
        ...state,
        isLoading: false,
        data: action.user,
        error: null,
      };
    case userActions.CLEAR_USER:
      console.log('CLEAR_USER');
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

export const updateUser = (state = defaultStateUpdate, action) => {
  switch (action.type) {
    case updateUserActions.UPDATE_USER_IS_LOADING:
      console.log('UPDATE_USER_IS_LOADING');
      return {
        ...state,
        isLoading: action.updateUserIsLoading,
        success: false,
        error: null,
      };
    case updateUserActions.UPDATE_USER_ERROR:
      console.log('UPDATE_USER_ERROR');
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.updateUserError.message,
      };
    case updateUserActions.UPDATE_USER_SUCCESS:
      console.log('UPDATE_USER_SUCCESS');
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };
    case rootActions.CLEAR_STATE:
      console.log('CLEAR_STATE');
      return {
        isLoading: false,
        success: null,
        error: null,
      };
    default:
      // console.log('DEFAULT');
      return state;
  }
};

export const createUser = (state = defaultStateCreate, action) => {
  switch (action.type) {
    case createUserActions.CREATE_USER_IS_LOADING:
      console.log('CREATE_USER_IS_LOADING');
      return {
        ...state,
        isLoading: action.createUserIsLoading,
        success: false,
        error: null,
      };
    case createUserActions.CREATE_USER_ERROR:
      console.log('CREATE_USER_ERROR');
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.createUserError.message,
      };
    case createUserActions.CREATE_USER_SUCCESS:
      console.log('CREATE_USER_SUCCESS');
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };
    case createUserActions.CLEAR_CREATE_USER:
      console.log('CLEAR_CREATE_USER');
      return {
        ...state,
        isLoading: null,
        success: null,
        error: null,
      };
    case rootActions.CLEAR_STATE:
      console.log('CLEAR_STATE');
      return {
        isLoading: false,
        success: null,
        error: null,
      };
    default:
      // console.log('DEFAULT');
      return state;
  }
};
