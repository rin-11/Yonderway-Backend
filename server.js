const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");

const database = require("./utils/database");
const restaurantRoutes = require("./routes/restaurants");
const attractionsRoutes = require("./routes/attractions");
const destinationsRouter = require('./routes/destinations');

const User = require('./models/users')



require("dotenv").config();

database.connect();

app.use(cors());
app.use("/restaurant", restaurantRoutes);
app.use("/attractions", attractionsRoutes);
app.use('/destinations', destinationsRouter);
app.use('/api/destinations', destinationsRouter);

// app.use('/register', usersRouter);
// app.use('/login', usersRouter);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
