module.exports = (sequelize, Sequelize) => {
  const Master = sequelize.define("masters", {
    master_name: {
      type: Sequelize.STRING
    },
    birthdate: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    position: {
      type: Sequelize.STRING
    },
    photo: {
      type: Sequelize.STRING
    },
    about_text: {
      type: Sequelize.STRING
    },
    group_service_id: {
      type: Sequelize.INTEGER
    }
  });

  return Master;
};
