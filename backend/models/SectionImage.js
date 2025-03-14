'use strict';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

class SectionImage extends Model {}

SectionImage.init({
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Sections', key: 'id' },
    onDelete: 'CASCADE'
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Images', key: 'id' },
    onDelete: 'CASCADE'
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  metadata: {
    type: DataTypes.JSONB // Optional: Can store image-specific settings (e.g., alignment, crop settings)
  }
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'SectionImage',
});

export default SectionImage;