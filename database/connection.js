const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "ujenzizone",
    "root",
    "gabby",
    {
        host: '127.0.0.1',
        dialect: "mysql",
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
    // .authenticate()
    // .then(() => {
    //   console.log('Connection has been established successfully.');
    // })
    // .catch(err => {
    //   console.error('Unable to connect to the database:', err);
    // });
module.exports = sequelize;
global.sequelize = sequelize;