const path = require('path');
const configPath = path.join(__dirname, '..', '..', '..', 'config', 'config.json');
const dbConfig = require(configPath)[process.env.NODE_ENV];
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Session = require("./Session.js")(sequelize, Sequelize);
db.SessionHistory = require("./SessionHistory.js")(sequelize, Sequelize);
db.User = require("./User.js")(sequelize, Sequelize);


db.Session.belongsTo(db.User, { as: "User", foreignKey: "user_id" });

db.Session.hasMany(db.SessionHistory, { as: "SessionHistory", foreignKey: "session_id" });
db.SessionHistory.belongsTo(db.Session, { as: "Session", foreignKey: "session_id" });

db.SessionHistory.belongsTo(db.User, { as: "User", foreignKey: "user_id" });
db.User.hasMany(db.Session, { as: "Session", foreignKey: "user_id" });
db.User.hasMany(db.SessionHistory, { as: "SessionHistory", foreignKey: "user_id" });

module.exports = db;