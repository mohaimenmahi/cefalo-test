let router = require("express").Router();

let userController = require("../controllers/userController");

//To check api route enable

router.get("/", function (req, res) {
  res.json({
    status: "API is Working",
    message: "Welcome to GET API",
  });
});

/** Userlist */

module.exports = router;
