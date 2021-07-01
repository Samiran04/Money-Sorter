import {
  GET_TRIP,
  GET_TRIP_FAIL,
  GET_TRIP_SUCCESS,
  ENTER_TRIP_USER,
  ENTER_TRIP_USER_FAILED,
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
    case GET_TRIP_SUCCESS:
      return {
        ...state,
        inProgress: false,
        error: null,
        data: action.trip,
      };
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
