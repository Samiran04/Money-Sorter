import { authenticate } from "passport";
import {
  USER_CREATE,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_SIGN_IN,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILED,
} from "./actionTypes";
import { getFormBody } from "../helpers/utils";
import { APIUrls } from "../helpers/getUrl";
import jwt_decode from "jwt-decode";

function startLogIn() {
  return {
    type: USER_SIGN_IN,
  };
}

function successLogIn(user) {
  return {
    type: USER_SIGN_IN_SUCCESS,
    user,
  };
}

function failedLogIn(data) {
  return {
    type: USER_SIGN_IN_FAILED,
    error: data.error,
  };
}

export function authenticateUser(email, password) {
  const url = APIUrls.login();

  console.log(email, password);

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
            })
          );
        }
      });
  };
}
