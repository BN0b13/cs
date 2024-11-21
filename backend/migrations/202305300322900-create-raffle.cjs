'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema(process.env.PG_SCHEMA_NAME, {
      ifNotExists: true
    });
    await queryInterface.createTable('Raffles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      ticketIds: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      type: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      disclaimer: {
        type: Sequelize.STRING
      },
      entries: {
        type: Sequelize.JSONB
      },
      entryLimit: {
        type: Sequelize.INTEGER
      },
      entryPrice: {
        type: Sequelize.INTEGER
      },
      winner: {
        type: Sequelize.JSONB
      },
      startDate: {
        type: Sequelize.STRING
      },
      completionDate: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      options: {
        type: Sequelize.JSONB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, { schema: process.env.PG_SCHEMA_NAME });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Raffles');
  }
};