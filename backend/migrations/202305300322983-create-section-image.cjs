'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SectionImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sectionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Sections', key: 'id' },
        onDelete: 'CASCADE'
      },
      imageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Images', key: 'id' },
        onDelete: 'CASCADE'
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: true, // Optional: Define image order within the section
        defaultValue: 0
      },
      metadata: {
        type: Sequelize.JSONB, // Optional: Store additional info (e.g., alignment, caption)
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }, { schema: process.env.PG_SCHEMA_NAME });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SectionImages', { schema: process.env.PG_SCHEMA_NAME });
  }
};