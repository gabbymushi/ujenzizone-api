const Sequelize=require("sequelize");
const sequelize=require("../database/connection");
const Thread = require('../models/Thread');
const Member = require('../models/Member');
const Comment=sequelize.define("comments",{
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
    member_id:{
        type:Sequelize.BIGINT,
        allowNull:true
    },
    comment:{
        type:Sequelize.TEXT,
        allowNull:false
    },
});
Comment.belongsTo(Thread, {
    foreignKey: 'thread_id',
    targetKey: 'thread_id',
    constraints: false,
    as: 'comments'
  });
Comment.belongsTo(Member, {
    foreignKey: 'member_id',
    targetKey: 'member_id',
    constraints: false,
    as: 'member'
  });
  module.exports=Comment;