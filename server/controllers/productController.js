const passport = require("passport");
require("../middleware/passport")(passport);

const Products = require("../models/Products");

const settings = require("../middleware/config");
const multer = require("multer");
const path = require("path");
const e = require("express");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = settings.imageServer;

    cb(null, path);
  },
  filename: (req, file, cb) => {
    // console.log('req', req.user)
    savedName =
      Date.now() + "_" + `${req.user._id}.` + file.mimetype.split("/")[1];
    cb(null, savedName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg"
    ) {
      return cb(true);
    } else {
      return cb(false, "ok");
    }
  },
}).single("image");

exports.addProduct = (req, res) => {
  if (req.user) {
    if (req.user.role === "admin") {
      upload(req, res, (err) => {
        if (err) {
          console.log("Error from Image upload", err);
          res.status(400).json({ msg: "Please upload a Image file" });
        } else {
          if (!req.file) {
            res.status(400).json({ msg: "No file given" });
          } else {
            let cloudinary = require("cloudinary").v2;
            cloudinary.config({
              cloud_name: process.env.CLOUD_NAME,
              api_key: process.env.API_KEY,
              api_secret: process.env.API_SECRET,
            });

            let path = req.file.path;

            let body = req.body;

            cloudinary.uploader.upload(path, {}, function (err, image) {
              if (err) return res.send(err);
              const fs = require("fs");
              fs.unlinkSync(path);
              let inputData = {
                name: body.name,
                imagePath: image.secure_url,
                description: body.description,
              };
              Products.addProduct(inputData, (status, errors, productData) => {
                if (status === 200) {
                  res.json({
                    status: 200,
                    data: productData,
                  });
                } else {
                  res.status(status).json({
                    status: status,
                    msg: errors.msg,
                  });
                }
              });
            });
          }
        }
      });
    } else {
      res.status(401).json({ status: 401, msg: "Unauthorized Permission" });
    }
  } else {
    res.status(401).json({ status: 401, msg: "Unautorized" });
  }
};

exports.updateProduct = (req, res) => {
  if (req.user) {
    if (req.user.role === "admin") {
      Products.updateProduct(req.body, (status, errors, updateData) => {
        if (status === 200) {
          res.json({
            status: 200,
            data: updateData,
          });
        } else {
          res.status(status).json({ status: status, msg: errors.msg });
        }
      });
    } else {
      res.status(401).json({ status: 401, msg: "Unauthorized Permission" });
    }
  } else {
    res.status(401).json({ status: 401, msg: "Unauthorized" });
  }
};

exports.updateImage = (req, res) => {
  if (req.user) {
    if (req.user.role === "admin") {
      upload(req, res, (err) => {
        if (err) {
          res.status(400).json({ msg: "Please upload a Image file" });
        } else {
          if (!req.file) {
            res.status(400).json({ msg: "No file given" });
          } else {
            let cloudinary = require("cloudinary").v2;
            cloudinary.config({
              cloud_name: process.env.CLOUD_NAME,
              api_key: process.env.API_KEY,
              api_secret: process.env.API_SECRET,
            });

            let path = req.file.path;
            let body = req.body;

            cloudinary.uploader.upload(path, {}, function (err, image) {
              if (err) return res.send(err);
              const fs = require("fs");
              fs.unlinkSync(path);
              let inputData = {
                id: body._id,
                path: image.secure_url,
              };
              Products.updateImage(inputData, (status, errors, productData) => {
                if (status === 200) {
                  res.json({
                    status: 200,
                    data: productData,
                  });
                } else {
                  res.status(status).json({
                    status: status,
                    msg: errors.msg,
                  });
                }
              });
            });
          }
        }
      });
    } else {
      res.status(401).json({ status: 401, msg: "Unauthorized Permission" });
    }
  } else {
    res.status(401).json({ status: 401, msg: "Unauthorized" });
  }
};

exports.getAllProducts = (req, res) => {
  Products.getAllProduct((status, error, data) => {
    if (status === 200) {
      res.json({
        status: 200,
        data: data,
      });
    } else {
      res.status(status).json({ status: status, msg: error.msg });
    }
  });
};

exports.getSearchResults = (req, res) => {
  Products.searchResult(req.body, (status, error, data) => {
    if (status === 200) {
      res.json({
        status: 200,
        data: data,
      });
    } else {
      res.status(status).json({ status: status, msg: error.msg });
    }
  });
};
