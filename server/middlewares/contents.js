const db = require("../models");
const Contents = db.contents;

checkDuplicateTableName = (req, res, next) => {
    Contents.findOne({
        tablename: req.body.tablename
    }).exec((err, tablename) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (tablename) {
            res.status(400).send({ message: "Таблица уже существует!"});
            return;
        }
        next();
    });
}

const contents = {
    checkDuplicateTableName
};

module.exports = contents;