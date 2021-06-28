import {
  USER_CREATE,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_SIGN_IN,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILED,
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
    case USER_SIGN_IN:
      return {
        ...state,
        error: null,
        isLoggedIn: false,
        inProgress: true,
      };
    case USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        error: null,
        isLoggedIn: true,
        inProgress: false,
      };
    case USER_SIGN_IN_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    default:
      return {
        ...state,
      };
  }
}
