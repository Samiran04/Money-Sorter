const express = require("express");
const router = express.Router();

const trip_controller_api = require("../../../controllers/api/v1/trip_controller");

router.post("/create", trip_controller_api.create);
router.post("/craete-user", trip_controller_api.createUser);
router.get("/fetch-trip-list", trip_controller_api.fetchTripsList);

module.exports = router;
