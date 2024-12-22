const { Sequelize } = require("sequelize");

const defaultURL = "mysql://root:password@localhost/app";

const connection = new Sequelize(process.env.DATABASE_URL ?? defaultURL);

connection.authenticate().then(() => console.log("Database is ready"));

module.exports = connection;