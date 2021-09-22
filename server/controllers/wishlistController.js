const Wishlist = require("../models/Wishlist");

const passport = require("passport");
require("../middleware/passport")(passport);

exports.getAll = (req, res) => {
  if (req.user) {
    Wishlist.getAllWishlist(req.user._id, (status, error, allData) => {
      if (status === 200) {
        res.json({
          status: 200,
          data: allData,
          msg: allData.length ? "Wishlist Fetched" : "No Items in Wishlist",
        });
      } else {
        res.status(status).json({
          status: status,
          msg: error.msg,
        });
      }
    });
  } else {
    res.status(401).json({ status: 401, msg: "Unauthorized" });
  }
};

exports.addWishlistItem = (req, res) => {
  if (req.user) {
    Wishlist.addToWishlist(req.body, req.user._id, (status, error, addData) => {
      if (status === 200) {
        res.json({
          status: 200,
          data: addData,
          msg: "Item Added to wishlist successfully",
        });
      } else {
        res.status(status).json({
          status: status,
          msg: error.msg,
        });
      }
    });
  } else {
    res.status(401).json({ status: 401, msg: "Unauthorized" });
  }
};

exports.removeWishlistItem = (req, res) => {
  if (req.user) {
    Wishlist.removeFromWishlist(req.body, (status, error, data) => {
      if (status === 200) {
        res.json({
          status: 200,
          data: data,
          msg: "Item deleted from wishlist successfully",
        });
      } else {
        res.status(status).json({
          status: status,
          msg: error.msg,
        });
      }
    });
  } else {
    res.status(401).json({ status: 401, msg: "Unauthorized" });
  }
};

exports.clearAll = (req, res) => {
  if (req.user) {
    Wishlist.clearAll(req.user._id, (status, error, data) => {
      if (status === 200) {
        res.json({
          status: 200,
          data: data,
          msg: "Wishlist Cleared",
        });
      } else {
        res.status(status).json({
          status: status,
          msg: error.msg,
        });
      }
    });
  } else {
    res.status(401).json({ status: 401, msg: "Unauthorized" });
  }
};
