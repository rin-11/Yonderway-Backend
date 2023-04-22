// Import necessary modules and files
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const database = require("./utils/database");
const bodyParser = require('body-parser');

const restaurantRoutes = require("./routes/restaurants");
const attractionsRouter = require('./routes/attractions');
const destinationsRouter = require('./routes/destinations');
const hotelRoutes = require('./routes/hotels');

const userRoutes = require('./routes/userRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

require("dotenv").config();

// Connect to the database
database.connect();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/restaurants", restaurantRoutes);
app.use("/attractions", attractionsRouter);
app.use('/destinations', destinationsRouter);
app.use('/hotels', hotelRoutes);
app.use('/api/destinations', destinationsRouter);

app.use('/api/users', userRoutes);
app.use('/wishlist', wishlistRoutes);

// Define a simple root route
app.get('/', (req, res) => {
  res.send("API is running..");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

