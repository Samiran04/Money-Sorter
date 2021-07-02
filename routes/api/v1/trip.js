const express = require("express");
const router = express.Router();

const trip_controller_api = require("../../../controllers/api/v1/trip_controller");

router.post("/create", trip_controller_api.create);
router.post("/create-user", trip_controller_api.createUser);
router.post("/change-money", trip_controller_api.changeMoney);
router.get("/fetch-trip-list", trip_controller_api.fetchTripsList);
router.get("/get-trip-data", trip_controller_api.getTripData);

module.exports = router;
