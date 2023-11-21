module.exports = app => {
    const groups = require("../controllers/group.controller.js");

    var router = require("express").Router();

    // Create a new group
    router.post("/", groups.create);

    // Retrieve all groups
    router.get("/", groups.findAll);

    // // Retrieve a single Tutorial with id
    router.get("/:id", groups.findOne);

    app.use('/api/groups', router);
};