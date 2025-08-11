const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String, // store file in DB (optional)
        required: false
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
