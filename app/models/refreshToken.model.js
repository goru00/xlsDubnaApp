const config = require('../config/auth.config');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

module.exports = () => { 
    const RefreshTokenSchema = new mongoose.Schema({
        token: {
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        expiryDate: Date
    }); 
    RefreshTokenSchema.statics.createToken = async function(user) {
        let expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
        let token = uuidv4();
        let obj = new this({
            token: token,
            user: user._id,
            expiryDate: expiredAt.getTime()
        });
        let refreshToken = await obj.save();
        return refreshToken.token;
    };
    RefreshTokenSchema.statics.verifyExpiration = (token) => {
        return token.expiryDate.getTime() < new Date().getTime();
    };
    return RefreshTokenSchema;
};

