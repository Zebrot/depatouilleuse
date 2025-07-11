const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const locationController = require('../controller/location');

router.post('/', locationController.createLocation);
router.get('/', locationController.getAllLocations);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;