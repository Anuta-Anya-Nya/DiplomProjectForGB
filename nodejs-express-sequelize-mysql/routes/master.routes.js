module.exports = app => {
    const masters = require("../controllers/master.controller.js");

    var router = require("express").Router();

    // Create a new Master
    router.post("/", masters.create);

    // Retrieve all Master
    router.get("/", masters.findAll);

    // Retrieve a single Master with id
    router.get("/:id", masters.findOne);

    app.use('/api/masters', router);
};