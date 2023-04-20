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
  
  module.exports = { notFound, errorHandler };