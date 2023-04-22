// Import required modules
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const { genToken, notFound, errorHandler } = require('../utils/userMiddleware');

// Define an asynchronous function for user login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user in the database using their email
    const user = await User.findOne({ email });

    // Check if the user exists and if their password matches
    if (user && (await user.matchPassword(password))){
        // If the user is found, return the user data along with a generated token
        res.json({
            _id: user._id,
            username: user.username,
            wishlist: user.wishlist,
            email: user.email,
            token: genToken(user._id)
        })
        // If the user is not found, throw an error
    } else {
        res.status(400)
        throw new Error('Invalid email and/or password')
    }
    await loginUser.save();

});

// Define an asynchronous function for user registration
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists by checking email
    const userExists = await User.findOne({ email })
    if(userExists) {
        res.status(400) // Error
        throw new Error('User Already Exists')
    };


// CREATE
    // If user does not exist, create user in the database
    const user = await User.create({
        username,
        email,
        password
    });
    // Once user is created, return success with database assigned ID
    if(user){
        res.status(201).json({ // Successful
            _id: user._id,
            username: user.username,
            email: user.email,
            wishlist: user.wishlist,
            token: genToken(user._id)
        });  
    await registerUser.save();
    res.json({ message: "User registered successfully"})
    } else {
    res.status(400) // Not successful
    throw new Error('User Register Error')
};
});

// Define an asynchronous function for retrieving the user's wishlist
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

// Export the functions for use in the user router module
module.exports = { registerUser, loginUser, getWishlist };
