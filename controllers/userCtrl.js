const asyncHandler = require('express-async-handler');
const jwtToken = require('jsonwebtoken');
const { genToken } = require('./tokenCtrl');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// User Login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try{
    // find user in DB by email
    const user = await User.findOne({ email });
    // if user email not found
    if (!user){
        throw new Error('User Does Not Exist')
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword){
        throw new Error('Incorrect Password')
    }
    // use jwttoken userID
    const token = jwtToken.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '3d'});
    res.json({
        token: genToken(user._id),
        _id: user._id,
        username: user.username,
        email: user.email
        });
    } catch {
        res.status(400)
        throw new Error('Login Error')
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // check if user already exists by checking email
    const userExists= await User.findOne({ email })
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
    } else {
        res.status(400) // not successful
        throw new Error('User Register Error')
    };
    await registerUser.save();
});




module.exports = { registerUser, loginUser };