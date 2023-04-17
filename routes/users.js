const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('../controllers/users');


router.get('/register', getUser);
router.post('/register', createUser);

module.exports = router;