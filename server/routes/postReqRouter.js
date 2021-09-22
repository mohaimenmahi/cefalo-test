let router = require("express").Router();

let userController = require("../controllers/userController");

//To check api route enable

router.get("/", function (req, res) {
  res.json({
    status: "API is Working",
    message: "Welcome to POST API",
  });
});

/*** User API's ***/
router.route("/sign-up").post(userController.signUp);
router.route("/log-in").post(userController.logIn);

module.exports = router;
