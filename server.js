const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./utils/database");
const restaurantRoutes = require("./routes/restaurant");
const attractionsRoutes = require("./routes/attractions");

require("dotenv").config();

database.connect();

app.use(cors());
app.use("/restaurant", restaurantRoutes);
app.use("/attractions", attractionsRoutes);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
