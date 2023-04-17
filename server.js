const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require('express-session');
const mongoose = require('mongoose');

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
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/restaurant", restaurantRoutes);
app.use("/attractions", attractionsRoutes);
app.use('/destinations', destinationsRouter);
app.use('/api/destinations', destinationsRouter);


const userRoutes = require('./routes/users')
app.use('/register', userRoutes);
// app.use('/login', usersRouter);

app.use((req, res) => {
	res.status(404).json({message: "NOT A PROPER ROUTE"})
})


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
