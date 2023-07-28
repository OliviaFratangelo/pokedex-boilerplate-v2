const Sequelize = require("sequelize");
const db = require("../db");
const Trainer = require("./Trainer");

const Pokemon = db.define("Pokemon", {
  name: {
    type: Sequelize.STRING, // Use Sequelize here instead of DataTypes
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING, // Use Sequelize here instead of DataTypes
    allowNull: false,
  },
  trainer: {
    type: Sequelize.STRING, // Use Sequelize here instead of DataTypes
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE, // Use Sequelize here instead of DataTypes
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING, // Use Sequelize here instead of DataTypes
    allowNull: false,
  },
});

Pokemon.belongsTo(Trainer);

module.exports = Pokemon;
