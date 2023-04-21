const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { Hotel, Restaurant } = require('../utils/database'); // Import the Hotel and Restaurant model


const userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
    wishlist: [{
        hotels: [{
            hotel: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Hotel"
            },
        }],
        restaurants: [{
            restaurant: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Restaurant"
            },
        }]
    }]
},
    { timestamps: true}
);

// user password decryption
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

// before saving user password encryption
userSchema.pre('save', async function (next) { 
    if(!this.isModified('password')) {
        next();
    }
    // bcrypt salt to generate encrypted code for password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});



const User = mongoose.model('User', userSchema);

module.exports = User;
