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

// database connection
// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   }); 

  // Mongo error/success messages
//   const db = mongoose.connection
//   db.on('error', (err) => console.log(`${err.message} MongoDB Not Running!`));
//   db.on('connected', () => console.log('mongo connected'));    
//   db.on('disconnected', () => console.log('mongo disconnected'));
  
//   app.use(express.json());
//   app.use(express.urlencoded({extended:true}));
//       //gives us access to req.body
//   app.use(methodOverride('_method'));
//       //gives us access to DELETE 
//   app.use(express.static('public'));
//       //link application to router
  
      

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
