const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsername = (req, res, next) => {
    const { username } = req.body;
    User.findOne({
        username: username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use" });
            return;
        }
        next();
    });
};

const checkRolesExisted = (req, res, next) => {
    const { roles } = req.body;
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!ROLES.includes(roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${roles[i]} does not exist!`
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsername,
    checkRolesExisted
}

module.exports = verifySignUp;