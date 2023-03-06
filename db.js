const Sequelize = require("sequelize");
const DataTypes = require("sequelize");
require("dotenv").config();
console.log(process.env.DB_DIALECT)

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);


sequelize.authenticate()
  .then(function (err) {
    console.log("connected");
  })
  .catch(function (err) {
    console.log("error" + err);
  });

  
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;

