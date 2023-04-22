// Import necessary modules and files
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const database = require("./utils/database");
const restaurantRoutes = require("./routes/restaurants");
const attractionsRouter = require('./routes/attractions');
const destinationsRouter = require('./routes/destinations');
const hotelRoutes = require('./routes/hotels');
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./utils/userMiddleware');
require("dotenv").config();

// Connect to the database
database.connect();

// Use CORS middleware to enable cross-origin resource sharing
app.use(cors());

// Parse request bodies as JSON
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/restaurants", restaurantRoutes);
app.use("/attractions", attractionsRouter);
app.use('/destinations', destinationsRouter);
app.use('/hotels', hotelRoutes);
app.use('/api/destinations', destinationsRouter);
app.use('/api/users', userRoutes);

// Define a simple root route
app.get('/', (req, res) => {
  res.send("API is running..");
});

// Use custom middleware for error handling
app.use(notFound);
app.use(errorHandler);

// Start the server on the specified port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
