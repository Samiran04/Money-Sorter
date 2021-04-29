const express = require('express');
const router = express.Router();

const trip_controller = require('../controllers/trip_controller');

router.post('/create', trip_controller.create);
router.get('/destroy', trip_controller.destroy);

module.exports = router;