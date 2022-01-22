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
        const { username, password } = req.body;
        User.findOne({
            username: username
        }).populate("roles", "-__v")
        .exec(async (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found"});
            }
            let passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.jwtExpiration
            });
            let refreshToken = await RefreshToken.createToken(user);
            let roles = [];
            for (let i = 0; i < user.roles.length; i++) {
                roles.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            const { _id, username } = user;
            res.status(200).send({
                id: _id,
                username: username,
                roles: roles,
                accessToken: token, 
                refreshToken: refreshToken
            });
        });
    }
}

module.exports = new Auth();