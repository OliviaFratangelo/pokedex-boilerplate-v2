const { DataTypes } = require("sequelize");
const db = require("../db");
const Trainer = require("./Trainer");

const Pokemon = db.define("Pokemon", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Pokemon.belongsTo(Trainer, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = Pokemon;
