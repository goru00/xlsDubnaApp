const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');
db.data = require('./data.model');
db.refreshToken = require('./refreshToken.model');

db.ROLES = ['user', 'administrator', 'user'];

module.exports = db;