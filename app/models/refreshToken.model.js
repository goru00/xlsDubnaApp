const config = require('../config/auth.config');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

module.exports = () => { 
    const RefreshToken = mongoose.model('refreshToken', new mongoose.Schema({
        token: {
            type: String
        },
        expiryDate: {
            type: Date
        }
    })); 
    RefreshToken.createToken = async function(user) {
        let expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
        let token = uuidv4();
        let refreshToken = await this.create({
            token: token,
            userId: user.id,
            expiryDate: expiredAt.getTime() 
        });
        return refreshToken.token;
    };
    RefreshToken.verifyExpiration = (token) => {
        return token.expiryDate.getTime() < new Date().getTime();
    };
    return RefreshToken;
};

