const db = require("../models");
const Master = db.masters;
const Op = db.Sequelize.Op;

// Create Master
exports.create = (req, res) => {
    // Validate request
    if (!req.body.master_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create master
    const master = {
        master_name: req.body.master_name,
        birthdate: req.body.birthdate,
        phone: req.body.phone,
        position: req.body.position,
        photo: req.body.photo,
        about_text: req.body.about_text,
        group_service_id: req.body.group_service_id
    };

    // Save master in the database
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
