const db = require('../models');
const User = db.user;
const Data = db.data;
const readXlsxFile = require('read-excel-file/node');
const parseXLSX = require('exceljs');
const { v4: uuidv4 } = require('uuid');
const { findById } = require('../models/user.model');

class DataContent {
    async get(req, res) {
        const { id } = req.params;
        if (id) {
            Data.findById(id).exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.status(200).send(data);
            });
        } else {
            const { page, limit } = req.query;
            if (!(page || limit)) {
                res.status(500).send({ message: "Page and limit is undefined"});
                return;
            }
            Data.find()
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                let datas = [];
                data.forEach((data) => {
                    datas.push({
                        _id: data._id,
                        tablename: data.tablename,
                        author: data.author,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt
                    });
                })
                res.status(200).send(datas);
            });
        }
    }
    async download(req, res) {
        const { id } = req.params;
        Data.findById(id).exec((err, data) => {

            let dataRows = [];

            data.tableData.forEach((obj) => {
                dataRows.push(obj)
            });

            let workbook = new parseXLSX.Workbook();
            let worksheet = workbook.addWorksheet("List1");

            data.tableHeader.forEach((head) => {
                worksheet.columns.push({
                    header: head,
                    key: head.toLowerCase(),
                    width: head.length
                });
            });
            worksheet.addRows(dataRows);

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + uuidv4() + ".xlsx"
            );
          
            return workbook.xlsx.write(res).then(function () {
                res.status(200).end();
            });
        })
    }
    async create(req, res) {
        try {
            if (req.file === undefined) {
                return res.status(400).send({ message: "Please upload excel file!"});
            }
            let path = "../app/resources/static/assets/uploads/" + req.file.filename;
            readXlsxFile(path).then((rows) => {
                let header = [];
                rows[0].forEach((head) => {
                    header.push(head);
                });
                rows.shift();
                let data = [];
                rows.forEach((row) => {
                    data.push(row);
                });
                const content = new Data({
                    tablename: req.file.filename,
                    tableHeader: header,
                    tableData: data,
                    author: req.userId,
                    createdAt: new Date(),
                    updatedAt: {
                        user: req.userId,
                        date: new Date()
                    }
                });
                content.save((err, data) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (req.userId) {
                        User.findById(req.userId, (err, data) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                            res.status(200).send({ message: "Data was added successfully!" });
                        });
                    }
                });
            });
        } catch(err) {
            console.log(err);
            res.status(500).send({
                message: "Could not upload the file: " + req.file.originalname
            });
        }
    }
    async update(req, res) {
        Data.findById(req.params.id).exec(async (err, data) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!(data.tablename || data.tableHeader || data.tableData)) {
                res.status(500).send({ message: "Body request is empty"});
                return;
            }
            const { 
                tablename = data.tablename,
                tableData = data.tableData,
                tableHeader = data.tableHeader
            } = req.body;
            Data.updateOne({
                _id: data._id
            }, {
                tablename: tablename,
                tableHeader: tableHeader,
                tableData: tableData,
                updatedAt: {
                    user: req.userId,
                    date: new Date()
                }
            }).exec((err, item) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.status(200).send({ message: "Data was update successfully", item});
            });
        });
    }
    async delete(req, res)
    {
        const { id } = req.params;
        Data.deleteOne({
            _id: id
        }).exec((err, data) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!data) {
                res.status(404).send({
                    message: "Data not found"
                });
            }
            res.status(200).send({
                message: "Data was delete successfully"
            });
        });
    }
}

module.exports = new DataContent();