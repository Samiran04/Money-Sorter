const express = require('express');
const router = express.Router();

const trip_controller = require('../controllers/trip_controller');

router.post('/create', trip_controller.create);
router.post('/create-user', trip_controller.createUser);
router.post('/enter-data', trip_controller.enterData);
router.get('/destroy', trip_controller.destroy);
router.get('/trip-open', trip_controller.tripOpen);

module.exports = router;