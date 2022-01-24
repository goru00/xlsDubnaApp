const mongoose = require('mongoose');

const Data = mongoose.model("datas", new mongoose.Schema({
    tablename: String,
    data: Array,
    sizeCells: {
        collumnsSize: Array,
        rowsSize: Array 
    },
    isPublic: Boolean,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: Date,
    updatedAt: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date: Date
    }
}));

module.exports = Data;