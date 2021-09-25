const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { validAddProduct, validUpdate } = require("../validators");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

productSchema.statics.checkProduct = async (data, cb) => {
  try {
    let isProduct = await Products.findOne({
      _id: data.productId,
      status: true,
    });

    if (isProduct) {
      return cb(200, null, data);
    } else {
      return cb(404, { msg: "Product is not available" }, null);
    }
  } catch (err) {
    return cb(500, { msg: "Internal server error" }, null);
  }
};

productSchema.statics.addProduct = async (data, cb) => {
  try {
    let isValid = validAddProduct(data);

    if (isValid.status) {
      let addData = await Products.create({
        name: data.name,
        image: data.imagePath,
        status: data.status,
        description: data.description,
      });

      if (addData) {
        return cb(200, null, addData);
      } else {
        return cb(
          400,
          { msg: "Product upload is not successful. Please Try again later" },
          null
        );
      }
    } else {
      return cb(400, { msg: isValid.msg }, null);
    }
  } catch (err) {
    return cb(500, { msg: "Internal Server Error" }, null);
  }
};

productSchema.statics.updateProduct = async (data, cb) => {
  try {
    let isValid = validUpdate(data);
    if (isValid.status) {
      let updateObj = {};

      if (data.name) updateObj["name"] = data.name;
      if (data.description) updateObj["description"] = data.description;
      if (data.status === true || data.status === false)
        updateObj["status"] = data.status;

      let updateProduct = await Products.updateOne(
        {
          _id: data._id,
        },
        {
          $set: updateObj,
        }
      );

      if (updateProduct) {
        return cb(200, null, updateProduct);
      } else {
        return cb(
          400,
          { msg: "Product update is not successful. Please try again later" },
          null
        );
      }
    } else {
      return cb(400, { msg: isValid.msg }, null);
    }
  } catch (err) {
    return cb(500, { msg: "Internal Server Error" }, null);
  }
};

productSchema.statics.updateImage = async (data, cb) => {
  try {
    let imageUpdate = await Products.updateOne(
      { _id: data.id },
      { $set: { image: data.path } }
    );

    if (imageUpdate) {
      return cb(200, null, imageUpdate);
    } else {
      return cb(
        400,
        {
          msg: "Product image is not updated successfully. Please try again later",
        },
        null
      );
    }
  } catch (err) {
    return cb(500, { msg: "Internal Server Error" }, null);
  }
};

productSchema.statics.getAllProduct = async (cb) => {
  try {
    let allProduct = await Products.find({ status: true });

    if (allProduct) {
      return cb(200, null, allProduct);
    } else {
      return cb(400, { msg: "Products can not be fecthed" }, null);
    }
  } catch (err) {
    return cb(500, { msg: "Internal Server Error" }, null);
  }
};

productSchema.statics.searchResult = async (data, cb) => {
  try {
    let isValid = /\S/.test(data.key);

    if (isValid) {
      let regex = new RegExp(`${data.key}`, "i");
      let result = await Products.find({ name: regex, status: true });

      if (result) {
        return cb(200, null, result);
      }
    } else {
      return cb(200, null, []);
    }
  } catch (err) {
    return cb(500, { msg: "Internal server error" }, null);
  }
};

module.exports = Products = mongoose.model("products", productSchema);
