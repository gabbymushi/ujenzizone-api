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
        //index: true,
        references: {
           model: 'threads', 
           key: 'thread_id' 
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
      },
  
});

  module.exports= Thread;