'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Raffles' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      table,
      'productId', 
      {
        type: Sequelize.INTEGER,
        references: { model: 'Products', key: 'id'},
      }, 
      { 
        schema: process.env.PG_SCHEMA_NAME 
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      table,
      'productId', 
      {
        type: Sequelize.INTEGER,
      }, 
      { 
        schema: process.env.PG_SCHEMA_NAME 
      });
  }
};
