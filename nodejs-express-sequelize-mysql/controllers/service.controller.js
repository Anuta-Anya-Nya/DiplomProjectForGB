const db = require("../models");
const Service = db.services;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const service = {
        title: req.body.title,
        group_service_id: req.body.group_service_id,
        duration: req.body.duration,
        price: req.body.price
    };

    Service.create(service)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Service."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Service.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Service."
            });
        });
};

exports.findServiceByGroup = (req, res) => {
    const group_service_id = req.query.group_service_id;

    Service.findAll({ where: { group_service_id: group_service_id, }, })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Service."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Service.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Service with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Service with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Service.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Service was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Master with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Service.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Service was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Service with id=" + id
            });
        });
};

