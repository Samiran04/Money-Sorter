import {
  GET_TRIP,
  GET_TRIP_FAIL,
  GET_TRIP_SUCCESS,
  ENTER_TRIP_USER,
  ENTER_TRIP_USER_FAILED,
  CREATE_TRIP_FAILED,
  CHANGE_MONEY_SUCCESS,
  CHANGE_MONEY_FAILED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from "../actions/actionTypes";

const initialTripState = {
  data: {},
  inProgress: false,
  error: null,
};

export default function trip(state = initialTripState, action) {
  switch (action.type) {
    case GET_TRIP:
      return {
        ...state,
        inProgress: true,
        error: null,
      };
    case DELETE_USER_SUCCESS:
    case CHANGE_MONEY_SUCCESS:
    case GET_TRIP_SUCCESS:
      return {
        ...state,
        inProgress: false,
        error: null,
        data: action.trip,
      };
    case DELETE_USER_FAILED:
    case CHANGE_MONEY_FAILED:
    case ENTER_TRIP_USER_FAILED:
    case GET_TRIP_FAIL:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case ENTER_TRIP_USER:
      state.data.users.push(action.user);
      return state;
    default:
      return {
        ...state,
      };
  }
}
