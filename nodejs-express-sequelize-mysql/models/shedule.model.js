module.exports = (sequelize, Sequelize) => {
  const Shedule = sequelize.define("shedules", {
    date: {
      type: Sequelize.STRING
    },
    time: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    master_id: {
      type: Sequelize.INTEGER
    },
    service_id: {
      type: Sequelize.INTEGER
    }
  });

  return Shedule;
};
