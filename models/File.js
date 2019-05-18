const Sequelize=require("sequelize");
const sequelize=require("../database/connection");
const Forum = require('../models/Forum');
const Member = require('../models/Member');

const File=sequelize.define("file",{
    file_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      thread_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      mime_type:{
        type:Sequelize.STRING(60),
        allowNull:false
    },
  
});

  module.exports= Thread;