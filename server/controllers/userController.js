const User = require("../models/User");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const passport = require("passport");
require("../middleware/passport")(passport);

exports.signUp = (req, res) => {
  User.signUpMethod(req.body, (status, errors, user) => {
    if (status === 200) {
      let tokenUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };
      jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
          data: tokenUser,
        },
        process.env.JWT_SECRET,

        (err, token) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.json({
              token: token,
              user: tokenUser,
            });
          }
        }
      );
    } else {
      res.status(status).json({
        status: status,
        msg: errors.msg,
      });
    }
  });
};

exports.logIn = (req, res) => {
  User.loginMethod(req.body, (status, errors, user) => {
    if (status === 200) {
      let tokenUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };

      jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
          data: tokenUser,
        },
        process.env.JWT_SECRET,
        (err, token) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            res.json({
              token: token,
              user: tokenUser,
            });
          }
        }
      );
    } else {
      res.status(status).json({
        status: status,
        msg: errors.msg,
      });
    }
  });
};
