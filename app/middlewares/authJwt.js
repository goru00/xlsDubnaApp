const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

const catchError = (err, res) => {
    if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }
}

const verifyToken = (req, res, next) => {
    let token = res.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, (err, decode) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decode.id;
        next();
    })
}

const isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        Role.find({
            id: {
                $in: user.roles
            }
        }, 
        (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'admin') {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Admin Role!" });
            return;
        });
    });
}
const isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        Role.find({
            id: {
                $in: user.roles
            }
        }, 
        (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'moderator') {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator Role!" });
            return;
        });
    });
}
const isUser = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        Role.find({
            id: {
                $in: user.roles
            }
        }, 
        (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'user') {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require User Role!" });
            return;
        });
    });
}

module.exports = {
    catchError, 
    verifyToken,
    isAdmin,
    isModerator,
    isUser
};