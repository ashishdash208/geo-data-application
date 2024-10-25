require('dotenv').config()
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, Sequelize);
db.GeoFile = require('./geoFile')(sequelize, Sequelize);

// Relations
db.User.hasMany(db.GeoFile);
db.GeoFile.belongsTo(db.User);

module.exports = db;
