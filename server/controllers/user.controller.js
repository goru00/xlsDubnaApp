const db = require('../models');
const Contents = db.contents;



exports.allAccess = (req, res) => {
  Contents.find().exec((err, data) => {
    let tb = [];
    for (let num = 0; num < data.length; num++) {
      tb.push(data[num].tablename);
    }
    res.status(200).send({
      tablename: tb
    });
  });
};
  
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
  
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
  
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
  