const Sequelize=require("sequelize");
module.exports=sequelize.define("Forum",{
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
  
});