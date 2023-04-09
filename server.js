const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./utils/database");
const destinationsRoutes = require("./routes/destinations");
require("dotenv").config();

database.connect();

app.use(cors());
app.use("/destinations", destinationsRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
