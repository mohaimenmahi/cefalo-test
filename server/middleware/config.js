const path = require("path");
require('dotenv').config()
let imgServer = path.resolve(process.cwd(), "./images");

module.exports = {
  dbUrl: process.env.CLOUD_DB_URL,
  secret: process.env.JWT_SECRET,
  imageServer: imgServer
};
