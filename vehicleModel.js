const DataTypes = require("sequelize");
const db = require("./db");

const Vehicle = db.sequelize.define("Vehicle", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  make: {
    type: DataTypes.STRING,
  },
  model: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});






module.exports = Vehicle;

