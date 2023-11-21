module.exports = app => {
    const shedule = require("../controllers/shedule.controller.js");

    var router = require("express").Router();

    // Create a new shedule
    router.post("/", shedule.create);

    // Retrieve all shedule
    router.get("/", shedule.findAll);

    //Retrieve a single shedule with id
    router.get("/:id", shedule.findOne);

    app.use('/api/shedule', router);
};