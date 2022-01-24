const config = require('../config/auth.config');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
    token: String, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    expiryDate: Date
});

RefreshTokenSchema.statics.createToken = async function(user) {
    let expiredAt = new Date();
    expiredAt.setSeconds(
        expiredAt.getSeconds() + config.jwtRefreshExpiration
    );
    let token = uuidv4();
    let obj = new this({
        token: token,
        user: user._id,
        expiryDate: expiredAt.getTime()
    });
    console.log(obj);
    let refreshToken = await obj.save();
    return refreshToken.token;
}

RefreshTokenSchema.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
}

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshToken;