const Sequelize=require("sequelize");
const sequelize=require("../database/connection");
const Forum = require('../models/Forum');
const Member = require('../models/Member');
const File = require('../models/File');

const Thread=sequelize.define("thread",{
    thread_id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    forum_id:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    member_id:{
        type:Sequelize.BIGINT,
        allowNull:true
    },
    title:{
        type:Sequelize.STRING(200),
        allowNull:false
    },
    body:{
        type:Sequelize.TEXT,
        allowNull:false
    },
  
});
Thread.belongsTo(Forum, {
    foreignKey: 'forum_id',
    targetKey: 'forum_id',
    constraints: false,
    as: 'forum'
  });
  Thread.belongsTo(Member, {
    foreignKey: 'member_id',
    targetKey: 'member_id',
    constraints: false,
    as: 'member'
  });
  Thread.hasMany(File, {
    foreignKey: 'thread_id',
    targetKey: 'thread_id',
    constraints: false,
    as: 'file'
  });
  module.exports= Thread;