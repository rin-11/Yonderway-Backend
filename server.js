// Import the required modules
const express = require("express"); // Import the Express.js framework
const app = express(); // Create an instance of the Express application
const cors = require("cors"); // Import the CORS middleware
const database = require("./utils/database"); // Import the database module
const restaurantRoutes = require("./routes/restaurants"); // Import the routes for the restaurant endpoint
const attractionsRouter = require('./routes/attractions'); // Import the routes for the attractions endpoint
const destinationsRouter = require('./routes/destinations'); // Import the routes for the destinations endpoint
const hotelRoutes = require('./routes/hotels'); // Import the routes for the hotels endpoint

require("dotenv").config(); // Load environment variables from the .env file

database.connect(); // Connect to the database

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) middleware

// Set up routes for different endpoints
app.use("/restaurant", restaurantRoutes); // Use the restaurant routes for the /restaurant endpoint
app.use('/attractions', attractionsRouter); // Use the attractions routes for the /attractions endpoint
app.use('/destinations', destinationsRouter); // Use the destinations routes for the /destinations endpoint
app.use('/api/destinations', destinationsRouter); // Use the destinations routes for the /api/destinations endpoint
app.use('/hotel', hotelRoutes); // Use the hotels routes for the /hotel endpoint

// Set the port number to listen for incoming requests
const port = process.env.PORT || 4000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
