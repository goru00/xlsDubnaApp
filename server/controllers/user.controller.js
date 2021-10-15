const db = require('../models');
const Contents = db.contents;



exports.allAccess = (req, res) => {
  Contents.find().exec((err, data) => {
    let tb = [], d = [];
    for (let num = 0; num < data.length; num++) {
      tb.push(data[num].tablename);
      d.push(data[num].data);
    }
    res.status(200).json({
      tablename: tb, 
      data: d
    });
  });
};
  
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.importFile = (req, res) => {
  
}

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
  
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
  