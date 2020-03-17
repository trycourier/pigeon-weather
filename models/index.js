const Sequelize = require("sequelize");

const sequelize = new Sequelize('database', 'username', 'password', {
  host: '0.0.0.0',
  dialect: 'sqlite',
  storage: '.data/database.sqlite'
});

const User = require("./user")(sequelize);
const Message = require("./message")(sequelize);

User.hasMany(Message);
Message.belongsTo(User);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync();
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = {
  sequelize,
  User,
  Message
};
