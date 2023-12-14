module.exports = app => {
    const services = require("../controllers/service.controller.js");

    var router = require("express").Router();
    
    router.post("/", services.create);
    
    router.get("/", services.findAll);
    
    router.get("/servicesById/:id", services.findOne);

    router.get("/byGroupService", services.findServiceByGroup);

    router.put("/:id", services.update);

    router.delete("/:id", services.delete);

    app.use('/api/services', router);
};