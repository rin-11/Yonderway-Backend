const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('../controllers/users') //all of our methods inside of controllers/index.js 


router.get('/register', getUser);
router.post('/register', createUser);

module.exports = router;