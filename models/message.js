const Sequelize = require("sequelize");

module.exports = sequelize => {
  const Message = sequelize.define("message", {
    messageId: {
      type: Sequelize.UUID,
      primaryKey: true
    }
  });
  return Message;
};