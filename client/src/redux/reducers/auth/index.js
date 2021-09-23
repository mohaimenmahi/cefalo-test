import { AUTH } from "../../constants/auth";

let initState = {
  token: null,
  authLoading: false,
  authErr: null,
  authData: null,
  open: "",
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case AUTH.OPEN_MODAL:
      return {
        ...state,
        open: action.data,
      };

    case AUTH.SET_SIGN_UP.MAIN:
      return {
        ...state,
        authLoading: true,
        authErr: null,
      };

    case AUTH.SET_SIGN_UP.SUCCESS:
      return {
        ...state,
        authLoading: false,
        authErr: null,
        token: action.token,
        authData: action.data,
      };

    case AUTH.SET_SIGN_UP.FAILURE:
      return {
        ...state,
        authLoading: false,
        authErr: action.result,
        token: null,
        authData: null,
      };

    case AUTH.SET_LOGIN.MAIN:
      return {
        ...state,
        authLoading: true,
        authErr: null,
      };

    case AUTH.SET_LOGIN.SUCCESS:
      return {
        ...state,
        authLoading: false,
        authErr: null,
        token: action.token,
        authData: action.data,
      };

    case AUTH.SET_LOGIN.FAILURE:
      return {
        ...state,
        authLoading: false,
        authErr: action.result,
        token: null,
        authData: null,
      };

    case AUTH.LOGOUT_USER:
      return {
        ...state,
        token: null,
        authData: null,
        authErr: null,
      };

    default:
      return state;
  }
}
