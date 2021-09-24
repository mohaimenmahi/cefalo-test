import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TimerMixin from "react-timer-mixin";

import { connect } from "react-redux";

import { signUp, openModal, clearAuthMsg } from "../../../redux/actions/auth";

import {
  validateEmail,
  validatePhone,
  passwordValidator,
  confirmPassValidator,
  validateNameField,
} from "../../../helpers/validators";

import "../../../assets/styles/auth.css";

const SignUp = (props) => {
  let {
    signUp,
    openModal,
    open,
    token,
    authData,
    authErr,
    authLoading,
    clearAuthMsg,
  } = props;

  let [user, setUser] = useState("");
  let [nameErr, setNameErr] = useState("");
  let [email, setEmail] = useState("");
  let [emailErr, setEmailErr] = useState("");
  let [password, setPassword] = useState("");
  let [passwordErr, setPasswordErr] = useState("");
  let [confirm, setConfirm] = useState("");
  let [confirmErr, setConfirmErr] = useState("");
  let [phone, setPhone] = useState("");
  let [phoneErr, setPhoneErr] = useState("");
  let [err, setErr] = useState("");
  let [success, setSuccess] = useState("");

  let handleUser = (e) => {
    setUser(e.target.value);
  };

  let nameBlur = () => {
    let valid = validateNameField(user);

    if (valid) {
      setNameErr("");
    } else {
      setNameErr("Name can not be empty");
    }
  };

  let handleEmail = (e) => {
    setEmail(e.target.value);
  };

  let emailBlur = () => {
    let valid = validateEmail.test(email);

    if (valid) {
      setEmailErr("");
    } else {
      setEmailErr("Email is not valid");
    }
  };

  let handlePhone = (e) => {
    setPhone(e.target.value);
  };

  let phoneBlur = () => {
    let valid = validatePhone(phone);

    if (valid) {
      setPhoneErr("");
    } else {
      setPhoneErr("Phone is not valid");
    }
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  let handleConfirm = (e) => {
    setConfirm(e.target.value);
  };

  let passwordBlur = () => {
    let valid = passwordValidator(password);

    if (valid) {
      setPasswordErr("");
    } else {
      setPasswordErr(
        "Password Must be of 6 Characters and spaces are not allowed"
      );
    }
  };

  let confirmBlur = () => {
    let valid = confirmPassValidator(password, confirm);

    if (valid) {
      setConfirmErr("");
    } else {
      setConfirmErr("Passwords did not match");
    }
  };

  const handleClose = () => {
    clearAuthMsg();
    setErr("");
    setSuccess("");
    setEmail("");
    setEmailErr("");
    setConfirm("");
    setConfirmErr("");
    setPhone("");
    setPhoneErr("");
    setUser("");
    setNameErr("");
    setPassword("");
    setPasswordErr("");
    openModal("");
  };

  let handleModal = () => {
    clearAuthMsg();
    setSuccess("");
    setErr("");
    openModal("login");
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    nameBlur();
    emailBlur();
    phoneBlur();
    passwordBlur();
    confirmBlur();

    let isValid =
      !nameErr.length ||
      !phoneErr.length ||
      !emailErr.length ||
      !passwordErr.length ||
      !confirmErr.length;

    if (isValid) {
      let data = {
        name: user,
        email: email,
        phone: phone,
        password: password,
      };
      signUp(data);
    }
  };

  useEffect(() => {
    if (token) {
      setSuccess("Signed In Successfully");
      TimerMixin.setTimeout(() => {
        handleClose();
      }, 5000);
    }
  }, [token]);

  useEffect(() => {
    if (authErr) {
      setErr(authErr);
    }
  }, [authErr]);

  return (
    <div>
      <Dialog open={open === "signup"} onClose={handleClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <form className="auth-form" onSubmit={handleSubmit}>
            <TextField
              required
              margin="dense"
              label="Name"
              type="text"
              value={user}
              variant="standard"
              onChange={handleUser}
              onBlur={nameBlur}
            />
            {nameErr.length ? <div className="auth-err">{nameErr}</div> : null}
            <TextField
              required
              margin="dense"
              label="Email"
              type="text"
              value={email}
              variant="standard"
              onChange={handleEmail}
              onBlur={emailBlur}
            />
            {emailErr.length ? (
              <div className="auth-err">{emailErr}</div>
            ) : null}
            <TextField
              required
              margin="dense"
              label="phone"
              type="text"
              value={phone}
              variant="standard"
              onChange={handlePhone}
              onBlur={phoneBlur}
            />
            {phoneErr.length ? (
              <div className="auth-err">{phoneErr}</div>
            ) : null}
            <TextField
              required
              type="password"
              margin="dense"
              label="Password"
              value={password}
              variant="standard"
              onChange={handlePassword}
              onBlur={passwordBlur}
            />
            {passwordErr.length ? (
              <div className="auth-err">{passwordErr}</div>
            ) : null}
            <TextField
              required
              type="password"
              margin="dense"
              label="Confirm Password"
              value={confirm}
              variant="standard"
              onChange={handleConfirm}
              onBlur={confirmBlur}
            />
            {confirmErr.length ? (
              <div className="auth-err">{confirmErr}</div>
            ) : null}
            <button type="submit" style={{ display: " none" }} />
            <Button
              className="button-class"
              variant="contained"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <p className="sign-link">
              Have an account?
              <span
                style={{
                  cursor: "pointer",
                  color: "#1976D2",
                  marginLeft: 2,
                  textDecoration: "underline",
                }}
                onClick={handleModal}
              >
                Log In
              </span>
            </p>
          </form>
          {success.length ? (
            <div className="auth-success">{success}</div>
          ) : null}
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
    signUp: (data) => dispatch(signUp(data)),
    openModal: (data) => dispatch(openModal(data)),
    clearAuthMsg: () => dispatch(clearAuthMsg()),
  };
};

export default connect(stateToProps, dispatchToProps)(SignUp);
