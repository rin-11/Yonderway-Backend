const router = require('express').Router()
const userData = require('../models/users')
const bcrypt = require("bcrypt");

// router.get('/register', UserCtrl.getUser)
// router.post('/register', UserCtrl.createUser)

const getUser = (req, res) => {
	userData.User.find({})
};
const createUser = (req, res) => {
	userData.User.create(req.body)

	const salt = bcrypt.genSaltSync(10)
	req.body.password = bcrypt.hashSync(req.body.password, salt)


	User.findOne({username: req.body.username}, (err, userExists) => {
		if (userExists) {
			res.status(404).json({message: "Cannot create user"})
		} else {
			User.create(req.body, (err, createdUser) => {
				req.session.currentUser = createdUser
				})
			}
		})
	};




module.exports = {
	getUser,
	createUser
};
