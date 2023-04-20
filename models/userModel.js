const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
},
{
    timestamps: true,
}
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
