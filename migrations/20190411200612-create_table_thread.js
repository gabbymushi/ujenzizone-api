'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('threads', {
      thread_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      forum_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        //index: true,
        references: {
           model: 'forums', 
           key: 'forum_id' 
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
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
      approvedAt:{ 
        type:Sequelize.DATE,
        allowNull: true,
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
    return queryInterface.dropTable('threads');
  }
};
