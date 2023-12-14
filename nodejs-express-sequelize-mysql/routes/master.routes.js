module.exports = app => {
    const masters = require("../controllers/master.controller.js");

    var router = require("express").Router();

    // Create a new Master
    router.post("/", masters.create);

    // Retrieve all Master
    router.get("/", masters.findAll);

    // Retrieve a single Master with id
    router.get("/:id", masters.findOne);

    router.delete("/:id", masters.delete);

    router.get("/masterlk/master", masters.findByNameAndPhone);

    router.put("/:id", masters.update);

    app.use('/api/masters', router);
};