const Sequelize=require("sequelize");
module.exports=sequelize.define("Member",{
    member_id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    first_name:{
        type:Sequelize.STRING(60),
        allowNull:false
    }
});