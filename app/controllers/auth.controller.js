const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

class Auth {
    signup(req, res) {
        const { username, password, roles } = req.body;
        const user = new User({
            username: username,
            password: password
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
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    user.roles = roles.map(role => role.id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                Role.findOne({
                    name: "user" 
                },
                (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    user.roles = [role.id];
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            }
        });
    }
    signin(req, res) {
        const { username } = req.body;
        User.findOne({
            username: username
        }).populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found" });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.jwtExpiration
            });
            var authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                roles: authorities,
                accessToken: token,
                refreshToken: refreshToken
            });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    }
    async refreshToken(req, res) {
        const { refreshToken: requestToken } = req.body;
        if (requestToken == null) {
            return res.status(403).json({ message: "Refresh Token is required" });
        }
        try {
            let refreshToken = await refreshToken.findOne({
                token: refreshToken
            });
            if (!refreshToken) {
                res.status(403).json({ message: "Refresh token is not in database!" });
                return;
            }
            if (RefreshToken.verifyExpiration(refreshToken)) {
                RefreshToken.deleteOne({
                    token: refreshToken
                });
                res.status(403).json({ message: "Refresh token was expired. Please make a new signin request" });
                return;
            }
        }
    }
}