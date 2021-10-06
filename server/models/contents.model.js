const mongoose = require('mongoose');

const Contents = mongoose.model(
    "Contents",
    new mongoose.Schema({
        tablename: String,
        data: [Array]
    })
);

module.exports = Contents;