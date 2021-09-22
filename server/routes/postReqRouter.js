let router = require("express").Router();

let userController = require("../controllers/userController");
let wishlistController = require("../controllers/wishlistController");
let productController = require("../controllers/productController");

const passport = require("passport");
require("../middleware/passport")(passport);

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

/** Wishlist */
router
  .route("/add-to-wishlist")
  .post(
    passport.authenticate("jwt", { session: false }),
    wishlistController.addWishlistItem
  );
router
  .route("/remove-from-wishlist")
  .post(
    passport.authenticate("jwt", { session: false }),
    wishlistController.removeWishlistItem
  );
router
  .route("/clear-wishlist")
  .post(
    passport.authenticate("jwt", { session: false }),
    wishlistController.clearAll
  );

/** Products */
router
  .route("/insert-product")
  .post(
    passport.authenticate("jwt", { session: false }),
    productController.addProduct
  );
router
  .route("/update-product")
  .post(
    passport.authenticate("jwt", { session: false }),
    productController.updateProduct
  );
router
  .route("/update-image")
  .post(
    passport.authenticate("jwt", { session: false }),
    productController.updateImage
  );
router.route("/search").post(productController.getSearchResults);

module.exports = router;
