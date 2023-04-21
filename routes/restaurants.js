const express = require("express");
const router = express.Router();

const { getRestaurants } = require("../controllers/restaurants");

router.get("/:city", getRestaurants);

module.exports = router;
