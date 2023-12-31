// инициализация sequelize
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.masters = require("./master.model.js")(sequelize, Sequelize);
db.services = require("./service.model.js")(sequelize, Sequelize);
db.group_services = require("./group.model.js")(sequelize, Sequelize);
db.shedules = require("./shedule.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];


db.user.hasMany(db.shedules);
db.shedules.belongsTo(db.user);

db.masters.hasMany(db.shedules);
db.shedules.belongsTo(db.masters);

db.services.hasMany(db.shedules);
db.shedules.belongsTo(db.services);

module.exports = db; 