import {
  GET_TRIP,
  GET_TRIP_FAIL,
  GET_TRIP_SUCCESS,
  ENTER_TRIP_USER,
  ENTER_TRIP_USER_FAILED,
  CHANGE_MONEY_SUCCESS,
  CHANGE_MONEY_FAILED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from "./actionTypes";
import { APIUrls } from "../helpers/getUrl";
import { getFormBody } from "../helpers/utils";

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

export function enterTrip(user) {
  return {
    type: ENTER_TRIP_USER,
    user,
  };
}

export function enterTripFailed(error) {
  return {
    type: ENTER_TRIP_USER_FAILED,
    error,
  };
}

export function changeMoneySuccess(trip) {
  return {
    type: CHANGE_MONEY_SUCCESS,
    trip,
  };
}

export function changeMoneyFailed(error) {
  return {
    type: CHANGE_MONEY_FAILED,
    error,
  };
}

export function deleteUserSuccess(trip) {
  return {
    type: DELETE_USER_SUCCESS,
    trip,
  };
}

export function deleteUserFailed(error) {
  return {
    type: DELETE_USER_FAILED,
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
          dispatch(tripFailed(data.message));
        }
      });
  };
}

export function enterTripUser(name, tripId) {
  const url = APIUrls.apiCreateTripUser();

  return (dispatch) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ name, tripId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          dispatch(enterTripFailed(data.message));
        } else {
          dispatch(enterTrip({ name, money: 0 }));
        }
      });
  };
}

export function changeMoney(tripId, name, money) {
  const url = APIUrls.apiChangeMoney();

  return (dispatch) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ tripId, name, money }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(changeMoneySuccess(data.data.trip));
        } else {
          dispatch(changeMoneyFailed(data.message));
        }
      });
  };
}

export function deleteUser(tripId, name) {
  const url = APIUrls.deleteUserApi(tripId, name);

  return (dispatch) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(deleteUserSuccess(data.data.trip));
        } else {
          dispatch(deleteUserFailed(data.message));
        }
      });
  };
}
