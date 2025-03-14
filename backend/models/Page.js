'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Page extends Model {
  
  static associate(models) {
    this.hasMany(models.Section, { foreignKey: 'pageId', onDelete: 'CASCADE' });
  }
}
Page.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Users', key: 'id' },
    onDelete: 'SET NULL'
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  position: {
    type: DataTypes.INTEGER
  },
  metadata: {
    type: DataTypes.JSONB
  }
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Page',
});

export default Page;