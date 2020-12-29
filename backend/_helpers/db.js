const config = require("config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.database;
  
  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: "mysql",
  });

  // init models and add them to the exported db object
  // db.Account = require("../accounts/account.model")(sequelize);
  // db.Song = require("../songs/song.model")(sequelize);
  db.sequelize = sequelize;

  // // define relationships
  // db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
  // db.RefreshToken.belongsTo(db.Account);

  // sync all models with database
  // await sequelize.sync();
}
