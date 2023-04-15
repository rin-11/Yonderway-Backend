const express = require('express');
const User = require('../models/users')
const router = express.Router();
const bcrypt = require("bcrypt");


router.get('/register', (req, res) => {

})

router.post('/register', (req, res) => {

    const salt = bcrypt.genSaltSync(10)
	req.body.password = bcrypt.hashSync(req.body.password, salt)


	User.findOne({username: req.body.username}, (err, userExists) => {
		if (userExists) {
			res.render('partials/baduser.ejs');
		} else {
			User.create(req.body, (err, createdUser) => {
				// console.log(createdUser)
				req.session.currentUser = createdUser
				res.redirect('/products')
			})
		}
	})
})


// 	bcrypt
//     .hash(request.body.password, 10)
//     .then((hashedPassword) => {
//       // create a new user instance and collect the data
//       const user = new User({
//         username: request.body.username,
//         password: hashedPassword,
//       });
//       // save the new user
//       user
//         .save()
//         // return success if the new user is added to the database successfully
//         .then((result) => {
//           response.status(201).send({
//             message: "Registration complete",
//             result,
//           });
//         })
//         // catch error if the new user wasn't added successfully to the database
//         .catch((error) => {
//           response.status(500).send({
//             message: "Registration error",
//             error,
//           });
//         });
//     })
// });

// Export the router for use in other modules
module.exports = router;