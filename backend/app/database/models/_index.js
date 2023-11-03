'use strict';

const fs = require('fs');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const configPath = path.join(__dirname, '..', '..', '..', 'config', 'config.json');
const config = require(configPath)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

() => {

  db.Session.belongsTo(User, { as: "user", foreignKey: "user_id"});
  db.User.hasMany(Session, { as: "Sessions", foreignKey: "user_id"});

  db.SessionHistory.belongsTo(Session, { as: "session", foreignKey: "session_id"});
  db.Session.hasMany(SessionHistory, { as: "SessionHistories", foreignKey: "session_id"});
  db.SessionHistory.belongsTo(User, { as: "user", foreignKey: "user_id"});
  db.User.hasMany(SessionHistory, { as: "SessionHistories", foreignKey: "user_id"});
}

module.exports = db;
