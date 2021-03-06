const Sequelize=require("sequelize");
const sequelize=require("../database/connection");
module.exports=sequelize.define("forum",{
    forum_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    forum_name:{
        type:Sequelize.STRING(60),
        allowNull:false
    },
    description:{
        type:Sequelize.TEXT,
        allowNull:false
    },
  
});