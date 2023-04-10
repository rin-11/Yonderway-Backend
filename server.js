const express = require("express");
const app = express();
const cors = require("cors");
const database = require('./utils/database')
const port = process.env.PORT


database.connect(); // Call the connect() function in the database.js file to establish a connection to the MongoDB database


// Import JSON files
// const filename = require('./nameofile.json')



// MIDDLEWARE
app.use(cors());

//home route for testing our app
app.get("/", (req, res) => {
//   res.send("working");
});

// route for retrieving API data
// app.get("/linkname", (req, res) => {
//   res.json(APIdata);
// });


// Define your routes and middleware here

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});