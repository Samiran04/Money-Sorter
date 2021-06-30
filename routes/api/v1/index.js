const express = require("express");
const router = express.Router();

router.use("/users", require("./users.js"));
router.use("/trips", require("./trip"));

module.exports = router;
