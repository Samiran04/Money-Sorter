import {
  USER_CREATE,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_SIGN_IN,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILED,
  SIGN_OUT,
  REMOVE_ERROR_MESSAGE,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAILED,
  FETCH_TRIP_LIST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "./actionTypes";
import { getFormBody } from "../helpers/utils";
import { APIUrls } from "../helpers/getUrl";
import jwt_decode from "jwt-decode";

export function startLogIn() {
  return {
    type: USER_SIGN_IN,
  };
}

export function successLogIn(user) {
  return {
    type: USER_SIGN_IN_SUCCESS,
    user,
  };
}

export function failedLogIn(data) {
  return {
    type: USER_SIGN_IN_FAILED,
    error: data.error,
  };
}

export function startSignOut() {
  localStorage.removeItem("token");
  return {
    type: SIGN_OUT,
  };
}

export function startSignUp() {
  return {
    type: USER_CREATE,
  };
}

export function successSignUp() {
  return {
    type: USER_CREATE_SUCCESS,
  };
}

export function removeErrorMessage() {
  return {
    type: REMOVE_ERROR_MESSAGE,
  };
}

export function failedSignUp(error) {
  return {
    type: USER_CREATE_FAIL,
    error,
  };
}

export function successTrip(trip) {
  return {
    type: CREATE_TRIP_SUCCESS,
    trip,
  };
}

export function failedTrip(error) {
  return {
    type: CREATE_TRIP_FAILED,
    error,
  };
}

export function successTripsListFetch(tripsList) {
  return {
    type: FETCH_TRIP_LIST,
    tripsList,
  };
}

export function updateUserSuccess(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    user,
  };
}

export function updateUserFailed(error) {
  return {
    type: UPDATE_USER_FAILED,
    error,
  };
}

export function authenticateUser(email, password) {
  const url = APIUrls.login();
  return (dispatch) => {
    dispatch(startLogIn());
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.data) {
          dispatch(failedLogIn({ error: "Invalid UserId/Password" }));
        } else {
          localStorage.setItem("token", data.data.token);
          const user = jwt_decode(data.data.token);
          dispatch(
            successLogIn({
              name: user.name,
              _id: user._id,
              email: user.email,
              password: user.password,
              tripsList: user.tripsList,
            })
          );
        }
      });
  };
}

export function createUser(name, email, password, confirm_password) {
  const url = APIUrls.signup();
  return (dispatch) => {
    dispatch(startSignUp());
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ name, email, password, confirm_password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.data) {
          dispatch(failedSignUp(data.message));
        } else {
          dispatch(successSignUp());
        }
      });
  };
}

export function createTrip(email, name) {
  const url = APIUrls.createNewTrip();

  return (dispatch) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ name, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          dispatch(failedTrip(data.message));
        } else {
          dispatch(successTrip(data.data.trip));
        }
      });
  };
}

export function getTripsList(email) {
  const url = APIUrls.apiFetchTripList(email);

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
          dispatch(successTripsListFetch(data.data.tripsList));
        }
      });
  };
}

export function updateUser(name, password, userId) {
  const url = APIUrls.updateUserApi();
  return (dispatch) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ name, password, userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          dispatch(updateUserFailed({ error: data.message }));
        } else {
          localStorage.removeItem("token");
          localStorage.setItem("token", data.data.token);
          const user = jwt_decode(data.data.token);
          dispatch(
            updateUserSuccess({
              name: user.name,
              _id: user._id,
              email: user.email,
              password: user.password,
              tripsList: user.tripsList,
            })
          );
        }
      });
  };
}
