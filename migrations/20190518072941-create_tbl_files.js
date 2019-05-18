'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('files', {
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
    mime_type:{
      type:Sequelize.STRING(20),
      allowNull:false
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
