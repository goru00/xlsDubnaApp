const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;
const dotenv = require('dotenv');
dotenv.config();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

class Auth {
    signup(req, res) {
        const { username, password, roles } = req.body; 
        const user = new User({
            username: username,
            password: bcrypt.hashSync(password, 8)
        });
        user.save((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (roles) {
                Role.find({
                    name: {
                        $in: roles
                    }
                }, (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.status(200).send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                Role.findOne({
                    name: "user"
                }, (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    user.roles = [role._id];
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.status(200).send({ message: "User was registered successfully!" });
                    });
                });
            }
        });
    }
    signin(req, res) {
        User.findOne({
            username: req.body.username
        })
        .exec(async (err, user) => {
            console.log(user)
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found"});
            }
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            let token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: config.jwtExpiration
            });
            let refreshToken = await RefreshToken.createToken(user);
            res.status(200).send({
                id: user._id,
                username: user.username,
                accessToken: token, 
                refreshToken: refreshToken
            });
        });
    }
    async refreshToken(req, res) {
        const { refreshToken : requestToken } = req.body;
        if (requestToken == null) {
            return res.status(403).json({ message: "Refresh token is required"});
        }
        try {
            let refreshToken = await RefreshToken.findOne({
                token: requestToken
            });
            if (!refreshToken) {
                res.status(403).json({ message: "Refresh token is not is database" });
                return;
            }
            if (RefreshToken.verifyExpiration(refreshToken)) {
                RefreshToken.findByIdAndRemove(refreshToken._id, {
                    useFindAndModify: false
                });
                res.status(403).json({
                    message: "Refresh token was expired. please make a new signin"
                });
                return;
            }
            let newAccessToken = jwt.sign({
                id: refreshToken.user._id
            },
            config.secret,
            {
                expiresIn: config.jwtExpiration
            });
            return res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: refreshToken.token
            });
        } catch(err) {
            return res.status(500).send({ message: err });
        }
    }
}

module.exports = new Auth();