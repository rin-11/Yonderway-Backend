const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userCtrl');


// User Register/Login routes
    // create new user
    router.post('/register', registerUser);
    // sign in existing user
    router.post('/login', loginUser);

module.exports = router;