const Sequelize = require("sequelize");

module.exports = sequelize => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    zipCode: Sequelize.STRING,
    tempScale: Sequelize.STRING,
    uiData: Sequelize.JSON
  });
  return User;
};
