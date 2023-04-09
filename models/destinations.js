const mongoose = require('mongoose');

// Define the schema for the Destination model
const DestinationSchema = new mongoose.Schema({
  name: String,
  location_id: Int32Array,
  city: String,
  latitude: String,
  longitude: String,
  photo: String,
  rating: Number,
  description: String,
  website: String,
  phone: String,
});

// Export the Destination model, which is based on the DestinationSchema
module.exports = mongoose.model('Destination', DestinationSchema);
