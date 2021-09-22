const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const process = require("process");
const cors = require("cors");
const getRoute = require("./routes/getReqRouter");
const postRoute = require("./routes/postReqRouter");
require("dotenv").config();

let port = process.env.PORT;

mongoose.Promise = require("bluebird");
mongoose
  .connect(process.env.CLOUD_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected via mongoose");
  })
  .catch((err) => {
    console.log("Mongoose connection error: ", err);
  });

app.use(express.static("public"));

/*To avoid CORS issues we have to define cors options with this library. It must be placed before routing start*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

//Server checkup
app.get("/", (req, res) => {
  res.send("Welcome to the Test API");
});

//Route Initialize

app.use("/api/get", getRoute);
app.use("/api/post", postRoute);

//This on use fr socket enable on client side
app.listen(port, () => console.log(`Server is up into port ${port}`));
