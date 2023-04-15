const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./utils/database");
const restaurantRoutes = require("./routes/restaurants");
const attractionsRouter = require('./routes/attractions');
const destinationsRouter = require('./routes/destinations');
const hotelRoutes = require('./routes/hotels');

require("dotenv").config();

database.connect();

app.use(cors());
app.use("/restaurant", restaurantRoutes);
app.use('/attractions', attractionsRouter);
app.use('/destinations', destinationsRouter);
app.use('/api/destinations', destinationsRouter);
app.use('/hotel', hotelRoutes);




const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
