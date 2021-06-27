const express = require("express");
const router = express.Router();

router.use("/users", "./users.js");

module.exports = router;
