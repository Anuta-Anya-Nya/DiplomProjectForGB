module.exports = app => {
    const masters = require("../controllers/master.controller.js");

    var router = require("express").Router();
    
    router.post("/", masters.create);
    
    router.get("/", masters.findAll);
    
    router.get("/:id", masters.findOne);

    router.delete("/:id", masters.delete);

    router.get("/masterlk/master", masters.findByNameAndPhone);

    router.put("/:id", masters.update);

    app.use('/api/masters', router);
};