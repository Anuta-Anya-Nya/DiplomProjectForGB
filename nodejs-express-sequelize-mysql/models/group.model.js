module.exports = (sequelize, Sequelize) => {
  const GroupService = sequelize.define("group_services", {
    title: {
      type: Sequelize.STRING
    }
  });

  return GroupService;
};
