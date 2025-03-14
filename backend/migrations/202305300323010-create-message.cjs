'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema(process.env.PG_SCHEMA_NAME, {
      ifNotExists: true
    });

    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Null for guest messages
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL'
      },
      receiverId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Null if message is sent to shop admin
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL'
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'read', 'archived'),
        defaultValue: 'pending'
      },
      replied: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    }, { schema: process.env.PG_SCHEMA_NAME });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages', { schema: process.env.PG_SCHEMA_NAME });
  }
};