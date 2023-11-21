module.exports = (sequelize, Sequelize) => {
  const GroupService = sequelize.define("group_services", {
    groupServiceTitle: {
      type: Sequelize.STRING
    }
  });

  return GroupService;
};
