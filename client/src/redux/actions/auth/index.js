import { AUTH } from "../../constants/auth";

export function signUp(data) {
  return {
    type: AUTH.SET_SIGN_UP.MAIN,
    data,
  };
}

export function logIn(data) {
  return {
    type: AUTH.SET_LOGIN.MAIN,
    data,
  };
}

export function openModal(data) {
  return {
    type: AUTH.OPEN_MODAL,
    data,
  };
}

export function logOut() {
  return {
    type: AUTH.LOGOUT_USER,
  };
}

export function clearAuthMsg() {
  return {
    type: AUTH.CLEAR_MSG,
  };
}
