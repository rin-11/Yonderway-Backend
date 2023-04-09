const Destination = require('../models/destinations');

exports.getDestinationRestaurants = async (city) => {
  try {
    const restaurants = await destinationData.getDestinationRestaurants(city);

    // Create a new destination object to save in the database
    const destination = new Destination({
      name: city,
      city: city,
      restaurants: restaurants
    });

    // Save the destination in the database
    await destination.save();

    return restaurants;
  } catch (error) {
    console.error(error);
  }
};
