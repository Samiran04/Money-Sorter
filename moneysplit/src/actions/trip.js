import { GET_TRIP, GET_TRIP_FAIL, GET_TRIP_SUCCESS } from "./actionTypes";
import { APIUrls } from "../helpers/getUrl";

export function tripProgress() {
  return {
    type: GET_TRIP,
  };
}

export function tripSuccess(trip) {
  return {
    type: GET_TRIP_SUCCESS,
    trip,
  };
}

export function tripFailed(error) {
  return {
    type: GET_TRIP_FAIL,
    error,
  };
}

export function getTrip(tripId) {
  const url = APIUrls.getTripData(tripId);

  return (dispatch) => {
    dispatch(tripProgress());
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(tripSuccess(data.data.trip));
        } else {
          dispatch(tripFailed(data.data.message));
        }
      });
  };
}
