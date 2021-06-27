const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const JWTPassport = require("./config/passport-jwt-strategy");

app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error on port 8000", err);
    return;
  }
});
