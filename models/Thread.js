const Sequelize=require("sequelize");
const sequelize=require("../database/connection");
module.exports=sequelize.define("Thread",{
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
    title:{
        type:Sequelize.STRING(200),
        allowNull:false
    },
    body:{
        type:Sequelize.TEXT,
        allowNull:false
    },
  
});