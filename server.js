const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require('express-session');


const database = require("./utils/database");
const restaurantRoutes = require("./routes/restaurants");
const attractionsRoutes = require("./routes/attractions");
const destinationsRouter = require('./routes/destinations');
const usersRouter = require('./routes/users');

const User = require('./models/users')



require("dotenv").config();

database.connect();


// ADD SESSION KEY TO .ENV FILE (ON TRELLO)
const SESSION_SECRET = process.env.SESSION_SECRET
console.log(SESSION_SECRET); // should see session key in console if working 
app.use(session({
    secret: SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false 
}));

app.use(cors());
app.use("/restaurant", restaurantRoutes);
app.use("/attractions", attractionsRoutes);
app.use('/destinations', destinationsRouter);
app.use('/api/destinations', destinationsRouter);

app.use('/register', usersRouter);
// app.use('/login', usersRouter);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
