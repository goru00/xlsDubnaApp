const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    secret: process.env.SECRET,
    jwtExpiration: 3600,
    jwtRefreshExpiration: 86400
};
