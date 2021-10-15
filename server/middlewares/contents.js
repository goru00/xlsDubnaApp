const db = require("../models");
const Contents = db.contents;

checkDuplicateTableName = (req, res, next) => {
    Contents.find({
        tablename: req.body.tablename
    });
}