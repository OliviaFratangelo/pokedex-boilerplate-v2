const { Sequelize } = require("sequelize");

const db = new Sequelize("postgres://localhost:5432/pokedex");

module.exports = db;