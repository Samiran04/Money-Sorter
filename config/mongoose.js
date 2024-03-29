const mongoose = require("mongoose");
const env = require("./environment");

mongoose.connect(`mongodb://localhost/${env.db}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Error while connrcting to MongoDB")
);

db.once("open", function () {
  console.log("Mongoose is connected to MongoDB");
});

module.exports = db;
