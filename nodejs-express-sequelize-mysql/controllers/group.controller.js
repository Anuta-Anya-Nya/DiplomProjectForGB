const db = require("../models");
const Group = db.group_services;
const Op = db.Sequelize.Op;

// Create GroupService
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const groupService = {
        title: req.body.title
    };

    // Save master in the database
    Group.create(groupService)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the GroupService."
            });
        });
};


exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Group.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving GroupService."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Group.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find GroupService with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving GroupService with id=" + id
            });
        });
};
