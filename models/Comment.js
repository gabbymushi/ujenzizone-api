const Sequelize=require("sequelize");
const sequelize=require("../database/connection");
const Thread = require('../models/Thread');
const Comment=sequelize.define("comment",{
    comment_id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    thread_id:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    Comment:{
        type:Sequelize.TEXT,
        allowNull:false
    },
});
Comment.belongsTo(Thread, {
    foreignKey: 'thread_id',
    targetKey: 'thread_id',
    constraints: false,
    as: 'comment'
  });