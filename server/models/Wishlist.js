const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    ref: "products",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

wishlistSchema.statics.addToWishlist = async (data, userId, cb) => {
  try {
    let addNew = await Wishlist.create({
      productId: data.productId,
      userId: userId,
    });

    if (addNew) {
      return cb(200, null, addNew);
    } else {
      return cb(
        400,
        { msg: "Unable to add wishlist. Please try later. " },
        null
      );
    }
  } catch (err) {
    return cb(500, { msg: "Internal Server Error" }, null);
  }
};

wishlistSchema.statics.removeFromWishlist = async (data, cb) => {
  try {
    let remove = await Wishlist.deleteOne({ _id: data.id });

    if (remove) {
      return cb(200, null, data);
    } else {
      return cb(400, { msg: "Unable To remove Item, Try later." }, null);
    }
  } catch (err) {
    return cb(500, { msg: "Internal Server Error" }, null);
  }
};

wishlistSchema.statics.getAllWishlist = async (userId, cb) => {
  try {
    let allItems = await Wishlist.find({ userId: userId }).populate({
      path: "productId",
    });

    if (allItems) {
      return cb(200, null, allItems);
    } else {
      return cb(400, { msg: "Unable to fetch wishlist" }, null);
    }
  } catch (err) {
    return cb(500, { msg: "Internal Server Error" }, null);
  }
};

wishlistSchema.statics.clearAll = async (userId, cb) => {
  try {
    let deleteData = await Wishlist.deleteMany({ userId: userId });

    if (deleteData) {
      return cb(200, null, deleteData);
    } else {
      return cb(400, { msg: "Unable to clear wishlist" }, null);
    }
  } catch (err) {
    return cb(500, { msg: "Internal Server Error" }, null);
  }
};

module.exports = Wishlist = mongoose.model("wishlist", wishlistSchema);
