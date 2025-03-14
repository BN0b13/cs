'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Image extends Model {}

Image.init({
  userId: {
    type: DataTypes.INTEGER, // References a User (optional)
    allowNull: true,
    references: { model: 'Users', key: 'id' },
    onDelete: 'SET NULL'
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  path: {
    type: DataTypes.STRING, // Where the image is stored on the server
    allowNull: false
  },
  fileType: {
    type: DataTypes.STRING, // "image/jpeg", "image/png", "image/webp"
    allowNull: false
  },
  width: {
    type: DataTypes.INTEGER, // Optional: Image width in pixels
    allowNull: true
  },
  height: {
    type: DataTypes.INTEGER, // Optional: Image height in pixels
    allowNull: true
  },
  size: {
    type: DataTypes.INTEGER, // File size in bytes
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSONB
  }
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Image',
});

export default Image;