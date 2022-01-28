const db = require('../models');
const Data = db.data;

const checkDuplicateTablename = (req, res, next) => {
    const { tablename } = req.body;
    Data.findOne({
        tablename: tablename
    }).exec((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (data) {
            res.status(400).send({ message: "Failed! Tablename is already exists" });
            return;
        }
        next();
    });
};

module.exports = {
    checkDuplicateTablename
};