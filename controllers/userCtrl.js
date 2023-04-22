const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const { genToken, notFound, errorHandler } = require('../utils/userMiddleware');

// User Login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // find user in DB by email
    const user = await User.findOne({ email });

    // check email and password macth
    if (user && (await user.matchPassword(password))){
        // if the user if found return the user data
        res.json({
            _id: user._id,
            username: user.username,
            wishlist: user.wishlist,
            email: user.email,
            token: genToken(user._id)
        })
        // if the user is not found
    } else {
        res.status(400)
        throw new Error('Invalid email and/or password')
    }
    await loginUser.save();

});

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // check if user already exists by checking email
    const userExists = await User.findOne({ email })
    if(userExists) {
        res.status(400) // error
        throw new Error('User Already Exists')
    };


// CREATE
    // if user does not exist create user in DB
    const user = await User.create({
        username,
        email,
        password
    });
    // once user is created return success with DB assigned ID
    if(user){
        res.status(201).json({ // successful
            _id: user._id,
            username: user.username,
            email: user.email,
            wishlist: user.wishlist,
            token: genToken(user._id)
        });  
    await registerUser.save();
    res.json({ message: "User registered successfully"})
    } else {
    res.status(400) // not successful
    throw new Error('User Register Error')
};
});

// User Wishlist Controllers

// GET wishlist

const getWishlist = asyncHandler(async (req, res) => {
    const { wishlist } = req.body;
    try {
        const wishlistData = await User.findOne({ wishlist });
    if (wishlistData) {
        return wishlistData.wishlist;
      }
    } catch (error) {
      console.error(error);
    }
  });




module.exports = { registerUser, loginUser,  getWishlist };