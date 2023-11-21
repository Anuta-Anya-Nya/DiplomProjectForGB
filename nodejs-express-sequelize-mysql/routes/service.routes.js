module.exports = app => {
    const services = require("../controllers/service.controller.js");

    var router = require("express").Router();

    // Create a new service
    router.post("/", services.create);

    // Retrieve all services
    router.get("/", services.findAll);

    //Retrieve a single service with id
    router.get("/:id", services.findOne);

    app.use('/api/services', router);
};