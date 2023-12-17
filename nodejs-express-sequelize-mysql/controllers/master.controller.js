const db = require("../models");
const Master = db.masters;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    
    if (!req.body.master_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    const master = {
        master_name: req.body.master_name,
        birthdate: req.body.birthdate,
        phone: req.body.phone,
        position: req.body.position,
        photo: req.body.photo,
        about_text: req.body.about_text,
        group_service_id: req.body.group_service_id
    };

    
    Master.create(master)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Master."
            });
        });
};

// Retrieve all Masters from the database.
exports.findAll = (req, res) => {
    const group_service_id = req.query.group_service_id;
    var condition = group_service_id ? { group_service_id: { [Op.eq]: group_service_id } } : null;

    Master.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving masters."
            });
        });
};
// Find a single Master with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Master.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Master with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Master with id=" + id
            });
        });
};

exports.findByNameAndPhone = (req, res) => {
    const name = req.query.name;
    const phone = req.query.phone;

    var condition = { [Op.and]: [{ master_name: `${name}` }, { phone: phone }] };

    Master.findOne({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving masters."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Master.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Master was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Master with id=${id}. Maybe Master was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Master with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Master.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Master was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Master with id=${id}. Maybe MAster was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Master with id=" + id
            });
        });
};
