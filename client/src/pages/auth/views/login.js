import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { connect } from "react-redux";

import { logIn, openModal, clearAuthMsg } from "../../../redux/actions/auth";

import "../../../assets/styles/auth.css";

const Login = (props) => {
  let {
    logIn,
    openModal,
    open,
    token,
    authData,
    authErr,
    authLoading,
    clearAuthMsg,
  } = props;

  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState("");

  let handleUser = (e) => {
    setUser(e.target.value);
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClose = () => {
    clearAuthMsg();
    setErr("");
    setUser("");
    setPassword("");
    openModal("");
  };

  let handleModal = () => {
    clearAuthMsg();
    setErr("");
    openModal("signup");
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      userName: user,
      password: password,
    };

    logIn(data);
  };

  useEffect(() => {
    if (token) {
      // localStorage.setItem("authToken", token);
      handleClose();
    }
  }, [token]);

  useEffect(() => {
    if (authErr) {
      setErr(authErr);
    }
  }, [authErr]);

  return (
    <div>
      <Dialog open={open === "login"} onClose={handleClose}>
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          <form className="auth-form" onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="Email Address or Phone Number"
              type="text"
              value={user}
              variant="standard"
              onChange={handleUser}
            />
            <TextField
              type="password"
              margin="dense"
              label="Password"
              value={password}
              variant="standard"
              onChange={handlePassword}
            />
            <button type="submit" style={{ display: " none" }} />
            <Button
              className="button-class"
              variant="contained"
              onClick={handleSubmit}
            >
              Log In
            </Button>
            <p className="sign-link">
              Do not have account?
              <span
                style={{
                  cursor: "pointer",
                  color: "#1976D2",
                  marginLeft: 2,
                  textDecoration: "underline",
                }}
                onClick={handleModal}
              >
                Sign Up
              </span>
            </p>
          </form>
          {err.length ? <div className="auth-err">{err}</div> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

let stateToProps = (state) => {
  return {
    authData: state.authReducer.authData,
    token: state.authReducer.token,
    authLoading: state.authReducer.authLoading,
    authErr: state.authReducer.authErr,
    open: state.authReducer.open,
  };
};

let dispatchToProps = (dispatch) => {
  return {
    logIn: (data) => dispatch(logIn(data)),
    openModal: (data) => dispatch(openModal(data)),
    clearAuthMsg: () => dispatch(clearAuthMsg()),
  };
};

export default connect(stateToProps, dispatchToProps)(Login);
