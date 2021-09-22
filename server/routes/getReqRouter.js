let router = require("express").Router();

let wishlistController = require("../controllers/wishlistController");
let productController = require("../controllers/productController");

const passport = require("passport");
require("../middleware/passport")(passport);

//To check api route enable

router.get("/", function (req, res) {
  res.json({
    status: "API is Working",
    message: "Welcome to GET API",
  });
});

/** Wishlist */
router
  .route("/all-wishlist")
  .get(
    passport.authenticate("jwt", { session: false }),
    wishlistController.getAll
  );

/** Products */
router.route("/all-products").get(productController.getAllProducts);

module.exports = router;
