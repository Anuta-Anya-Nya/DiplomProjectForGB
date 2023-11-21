module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define("services", {
    title: {
      type: Sequelize.STRING
    },
    group_service_id: {
      type: Sequelize.INTEGER
    },
    duration: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.INTEGER
    }
  });

  return Service;
};
