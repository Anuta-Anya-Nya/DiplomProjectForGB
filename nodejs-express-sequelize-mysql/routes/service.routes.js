module.exports = app => {
    const services = require("../controllers/service.controller.js");

    var router = require("express").Router();

    // Create a new Master
    router.post("/", services.create);

    // Retrieve all Tutorials
    router.get("/", services.findAll);

    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);

    // // Retrieve a single Tutorial with id
    router.get("/:id", services.findOne);

    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);

    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);

    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);

    app.use('/api/services', router);
};