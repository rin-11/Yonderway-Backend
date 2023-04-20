// Use JWT Token to send user auth token from backend to frontend
const token = require('jsonwebtoken');
const genToken = (id) => {
    return token.sign({id}, process.env.JWT_SECRET)
};


// User Error Handling Middleware
const notFound = (req, res, next) => { // when the route is not found
    const error = new Error(`URL Not Found`);
    res.status(404);
    next(error);
  };
  
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      // add 'NODE_ENV=development' into .env file
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  
  module.exports = { notFound, errorHandler, genToken };

