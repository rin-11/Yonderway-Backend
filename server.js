const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./utils/database");
const yelp = require('yelp-fusion');

const restaurantRoutes = require("./routes/restaurants");
const attractionsRouter = require('./routes/attractions');
const destinationsRouter = require('./routes/destinations');
const hotelRoutes = require('./routes/hotels');

const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./utils/userMiddleware');

require("dotenv").config();

database.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Add middleware to include Yelp API client
app.use(async (req, res, next) => {
  try {
    const client = await yelp.client(process.env.YELP_API_KEY);
    req.yelp = client;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: err.message,
      stack: err.stack,
    });
  }
});

app.use("/restaurants", restaurantRoutes);
app.use("/attractions", attractionsRouter);
app.use('/destinations', destinationsRouter);
app.use('/hotels', hotelRoutes);
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
