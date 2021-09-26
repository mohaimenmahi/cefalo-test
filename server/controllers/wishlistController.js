const Wishlist = require("../models/Wishlist");
const Products = require("../models/Products");

const passport = require("passport");
require("../middleware/passport")(passport);

exports.getAll = (req, res) => {
  if (req.user) {
    Wishlist.getAllWishlist(req.user._id, (status, error, allData) => {
      if (status === 200) {
        let filtered = allData.length
          ? allData.filter((item) => item.productId)
          : [];
        res.json({
          status: 200,
          data: filtered,
          msg: filtered.length ? "Wishlist Fetched" : "No Items in Wishlist",
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
    Products.checkProduct(req.body, (proStatus, proErr, proData) => {
      if (proStatus === 200) {
        Wishlist.addToWishlist(
          req.body,
          req.user._id,
          (status, error, addData) => {
            if (status === 200) {
              Wishlist.getAllWishlist(
                req.user._id,
                (allStatus, allError, allData) => {
                  if (allStatus === 200) {
                    res.json({
                      status: 200,
                      data: allData,
                      msg: "Item Added to wishlist successfully",
                    });
                  } else {
                    res.status(allStatus).json({
                      status: allStatus,
                      msg: allError.msg,
                    });
                  }
                }
              );
            } else {
              res.status(status).json({
                status: status,
                msg: error.msg,
              });
            }
          }
        );
      } else {
        res.status(proStatus).json({
          status: proStatus,
          msg: proErr.msg,
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
        Wishlist.getAllWishlist(
          req.user._id,
          (allStatus, allError, allData) => {
            if (allStatus === 200) {
              res.json({
                status: 200,
                data: allData,
                msg: "Item deleted from wishlist successfully",
              });
            } else {
              res.status(allStatus).json({
                status: allStatus,
                msg: allError.msg,
              });
            }
          }
        );
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
