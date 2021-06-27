const express = require("express");
const router = express.Router();

const user_controller_api = require("../../../controllers/api/v1/user_controller");

router.post("/create", user_controller_api.create);
router.post("/create-session", user_controller_api.createSession);

module.exports = router;
