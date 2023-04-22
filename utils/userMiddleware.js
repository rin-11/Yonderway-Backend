// Import required modules and models
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// Use JWT Token to send user auth token from backend to frontend
const token = require('jsonwebtoken');

// Generate a JWT token with given user id
const genToken = (id) => {
    return token.sign({id}, process.env.JWT_SECRET, {expiresIn: '3d'});
};

// Middleware functions for handling errors
// Send a 404 response if the route is not found
const notFound = (req, res, next) => {
    const error = new Error(`URL Not Found`);
    res.status(404);
    next(error);
};

// Send a JSON response with the error message and status code
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

// Export the middleware functions
module.exports = { notFound, errorHandler, genToken };
