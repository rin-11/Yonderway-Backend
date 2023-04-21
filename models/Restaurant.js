const RestaurantSchema = new mongoose.Schema({
  city: { type: String, unique: true },
  restaurants: [
    {
      name: String,
      rating: Number,
      description: String,
      photo: String
    }
  ]
});

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
