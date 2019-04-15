const Sequelize=require("sequelize");
const sequelize=require("../database/connection");
const Thread = require('../models/Thread');
const Comment=sequelize.define("Comment",{
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
});