'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('comments', {
      comment_id: {
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
      member_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        //index: true,
        references: {
           model: 'members', 
           key: 'member_id' 
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
      },
      Comment:{
        type:Sequelize.TEXT,
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
   return queryInterface.dropTable('comments');
  }
};
