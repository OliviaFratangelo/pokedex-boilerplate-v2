const { DataTypes } = require("sequelize");
const db = require("../db");

const Trainer = db.define("Trainer", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Trainer;


