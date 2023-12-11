const db = require("../models");
const Shedule = db.shedules;
const User = db.user;
const Master = db.masters;
const Service = db.services;
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
        userId: req.body.userId,
        masterId: req.body.masterId,
        serviceId: req.body.serviceId
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
    const masterId = req.query.masterId;
    var condition = date && masterId ? { [Op.and]: [{ date: `${date}` }, { masterId: masterId }] } : null;
    Shedule.findAll({
        where: condition
    })
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
    const userId = req.query.userId;

    Shedule.findAll({
        where: { userId: userId }, include: [
            {
                model: Master,
                attributes: ['master_name']
            },
            {
                model: Service,
                attributes: ['title', 'duration', 'price']
            }]
    })
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

exports.findAllSheduleForAdmin = (req, res) => {
    const date = req.query.date;

    Shedule.findAll({
        where: { date: date }, include: [{
            model: User,
            attributes: ['name', 'phone']
        },
        {
            model: Master,
            attributes: ['master_name', 'position']
        },
        {
            model: Service,
            attributes: ['title', 'duration', 'price']
        }]
    })
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

exports.findAllSheduleForMaster = (req, res) => {
    const date = req.query.date;
    const masterId = req.query.masterId;
    var condition = date && masterId ? { [Op.and]: [{ date: `${date}` }, { masterId: masterId }] } : null;
    Shedule.findAll({
        where: condition, include: [{
            model: User,
            attributes: ['name']
        },
        {
            model: Service,
            attributes: ['title']
        }]
    })
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



// exports.findAll = (req, res) => {

//     Shedule.findAll({ include: User })
//         .then(data => {
//             console.log('data', JSON.stringify(data, null, 2))
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving Shedule."
//             });
//         });
// };


