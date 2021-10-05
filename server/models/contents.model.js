const mongoose = require('mongoose');

const Contents = mongoose.model(
    "Contents",
    new mongoose.Schema({
        tablename: String,
        data: {
            cols: [
                {
                    name: String,
                    keys: Number
                }
            ],
            rows: [Array]
        }
    })
);

module.exports = Contents;