const express = require("express");
const app = express();
const env = require("./config/environment");
const port = env.dev_port;
const db = require("./config/mongoose");
const JWTPassport = require("./config/passport-jwt-strategy");
const path = require("path");

app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", require(path.join(__dirname, env.routes_path)));

app.listen(port, function (err) {
  if (err) {
    console.log("Error on port", err);
    return;
  }
});
