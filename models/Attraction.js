// Import Mongoose for schema creation
const mongoose = require('mongoose');

// Define the attraction schema using Mongoose's Schema class
const AttractionSchema = new mongoose.Schema({
  city: String, // The city the attraction is located in
  type: String, // The type of attraction
  attractions: [ // An array of attraction objects
    {
      name: String, // The name of the attraction
      rating: Number, // The attraction's rating (1-5)
      description: String, // A description of the attraction
      photo: String, // A URL for a photo of the attraction
    },
  ],
});

// Compile the schema into a model using Mongoose's model method
module.exports = mongoose.model('Attraction', AttractionSchema);
