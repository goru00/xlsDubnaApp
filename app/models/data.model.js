const mongoose = require('mongoose');

const Data = mongoose.model("datas", new mongoose.Schema({
    tablename: String,
    data: Array
}));

module.exports = Data;