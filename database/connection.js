const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "ujenzizone",
    "gabby",
    "gabby",
    {
        host: '127.0.0.1',
        dialect: "mysql",
        // operatorsAliases: true,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
module.exports = sequelize;
global.sequelize = sequelize;