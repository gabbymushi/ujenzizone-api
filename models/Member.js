const Sequelize=require("sequelize");
module.exports=sequelize.define("Member",{
    member_id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    }

});