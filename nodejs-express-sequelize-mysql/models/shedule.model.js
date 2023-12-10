module.exports = (sequelize, Sequelize) => {
  const Shedule = sequelize.define("shedules", {
    date: {
      type: Sequelize.STRING
    },
    time: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    masterId: {
      type: Sequelize.INTEGER
    },
    serviceId: {
      type: Sequelize.INTEGER
    }
  });

  return Shedule;
};
