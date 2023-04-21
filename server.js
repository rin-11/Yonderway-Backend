const express = require("express"); // Import the Express.js framework
const app = express(); // Create an instance of the Express application
const cors = require("cors"); // Import the CORS middleware
const database = require("./utils/database"); // Import the database module


const restaurantRoutes = require("./routes/restaurants"); // Import the routes for the restaurant endpoint
const attractionsRouter = require('./routes/attractions'); // Import the routes for the attractions endpoint
const destinationsRouter = require('./routes/destinations'); // Import the routes for the destinations endpoint
const hotelRoutes = require('./routes/hotels'); // Import the routes for the hotels endpoint


const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./utils/userMiddleware');
require("dotenv").config();

database.connect();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/restaurant", restaurantRoutes);
app.use("/attractions", attractionsRouter);
app.use('/destinations', destinationsRouter);
app.use('/hotel', hotelRoutes);
app.use('/api/destinations', destinationsRouter);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send("API is running..");
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

