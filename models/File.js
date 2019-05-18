const Sequelize=require("sequelize");
const sequelize=require("../database/connection");
const Thread = require('../models/Thread');

const File=sequelize.define("file",{
    file_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      file_name: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      thread_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      mime_type:{
        type:Sequelize.STRING(20),
        allowNull:false
    },
  
});
File.belongsTo(Thread, {
    foreignKey: 'thread_id',
    targetKey: 'thread_id',
    constraints: false,
    as: 'files'
  });
  module.exports= File;