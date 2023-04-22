const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	username: {type: String},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
    wishlist: {type: mongoose.Schema.Types.ObjectId, ref: "Wishlist"},
        },
    { timestamps: true }
);


const User = mongoose.model('User', userSchema);

module.exports = User;


