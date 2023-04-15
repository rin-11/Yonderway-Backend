// Import the required modules and controllers
const express = require('express');
const destinationsController = require('../controllers/destinations');
const router = express.Router();

// Define two routes that use functions from the destinationsController module
router.get('/', destinationsController.getDestinations);
router.get('/random-photos', destinationsController.getRandomPhotos);

// Export the router
module.exports = router;
