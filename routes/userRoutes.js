const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userCtrl');

// API endpoints
router.route('/').post(registerUser);
router.route('/login').post(loginUser);


module.exports = router;