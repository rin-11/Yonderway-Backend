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
const wishlistRoutes = require('./routes/wishlistRoutes');

require("dotenv").config();
database.connect();

// Middlware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*
// Yelp API request route
app.get("/api/restaurants/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const yelpResponse = await axios.get("https://api.yelp.com/v3/businesses/search", {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: {
        term: "restaurants",
        location: city,
        sort_by: "rating",
        limit: 4,
      },
    });
    res.json(yelpResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching restaurants." });
  }
});
*/
app.use("/restaurants", restaurantRoutes);
app.use("/attractions", attractionsRouter);
app.use('/destinations', destinationsRouter);
app.use('/hotels', hotelRoutes);
app.use('/api/destinations', destinationsRouter);


app.use('/user', userRoutes);
// app.use('/wishlist', wishlistRoutes);



const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
