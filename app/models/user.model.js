const mongoose = require('mongoose');

const User = mongoose.model('users', new mongoose.Schema({
    username: String,
    password: String,
    role: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
}));

module.exports = User;