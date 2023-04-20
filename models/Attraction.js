const mongoose = require('mongoose');

const AttractionSchema = new mongoose.Schema({
  city: String,
  type: String,
  attractions: [
    {
      name: String,
      rating: Number,
      description: String,
      photo: String,
    },
  ],
});

module.exports = mongoose.model('Attraction', AttractionSchema);
