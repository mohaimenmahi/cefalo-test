const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
});

userSchema.statics.signUpMethod = (data, cb) => {
  User.find({
    $and: [
      {
        $or: [{ email: data.email }, { phone: data.phone }],
      },
    ],
  })
    .then((users) => {
      if (users.length) {
        return cb(
          400,
          { msg: "The email address or phone number is already taken" },
          null
        );
      } else {
        let newAuth = new User({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: data.role ? data.role : null,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAuth.password, salt, (err, hash) => {
            if (err) {
              return cb(500, { msg: "Internal server error" }, null);
            }
            newAuth.password = hash;
            newAuth
              .save()
              .then((user) => {
                return cb(200, null, user);
              })
              .catch((err) => {
                console.log("error from password hashing: ", err);
                return cb(500, { msg: "Internal server error " }, null);
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log("error from signup email", err);
      return cb(500, { msg: "Internal server error" }, null);
    });
};

userSchema.statics.loginMethod = (data, cb) => {
  User.findOne({
    $or: [{ email: data.userName }, { phone: data.userName }],
  })
    .then((user) => {
      if (!user) {
        return cb(404, { msg: "Email is not registered" }, null);
      } else {
        bcrypt.compare(data.password, user.password).then((isMatch) => {
          if (isMatch) {
            return cb(200, null, user);
          } else {
            return cb(
              400,
              { msg: "The password that you've entered is incorrect" },
              null
            );
          }
        });
      }
    })
    .catch((err) => {
      console.log("Mongo error", err);
      return cb(500, { msg: "Internal Server error" }, null);
    });
};

module.exports = User = mongoose.model("users", userSchema);
