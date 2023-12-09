const db = require("../models");
const Shedule = db.shedules;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

    if (!req.body.date) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const shedule = {
        date: req.body.date,
        time: req.body.time,
        user_id: req.body.user_id,
        master_id: req.body.master_id,
        service_id: req.body.service_id
    };


    Shedule.create(shedule)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the shedule."
            });
        });
};

exports.findAll = (req, res) => {
    const date = req.query.date;
    const master_id = req.query.master_id;

    var condition = date && master_id ? { [Op.and]: [{ date: `${date}` }, { master_id: master_id }] } : null;
    

    Shedule.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Shedule."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Shedule.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Shedule with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Shedule with id=" + id
            });
        });
};

exports.findUserShedule = (req, res) => {
    const user_id = req.query.user_id;

    Shedule.findAll({ where: { user_id: user_id }, })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Shedule."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Shedule.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Shedule was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Shedule with id=${id}. Maybe Shedule was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};


