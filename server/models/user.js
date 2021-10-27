const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    aadhar: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    voted: {
        type: Boolean,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;