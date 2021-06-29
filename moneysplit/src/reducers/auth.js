import {
  USER_CREATE,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_SIGN_IN,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILED,
  SIGN_OUT,
  REMOVE_ERROR_MESSAGE,
} from "../actions/actionTypes";

const inititalUserState = {
  user: {},
  inProgress: false,
  error: null,
  isLoggedIn: false,
  signup: false,
};

export default function auth(state = inititalUserState, action) {
  switch (action.type) {
    case USER_CREATE:
    case USER_SIGN_IN:
      return {
        ...state,
        error: null,
        isLoggedIn: false,
        inProgress: true,
        signup: false,
      };
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        signup: true,
      };
    case USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        error: null,
        isLoggedIn: true,
        inProgress: false,
        signup: false,
        user: action.user,
      };
    case USER_CREATE_FAIL:
    case USER_SIGN_IN_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
        signup: false,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    case REMOVE_ERROR_MESSAGE:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
}
