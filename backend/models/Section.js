'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Section extends Model {
  
  static associate(models) {
    
  }
}
Section.init({
  pageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Pages', key: 'id' },
    onDelete: 'CASCADE'
  },
  userId: {
    type: DataTypes.INTEGER, // References a User (optional)
    allowNull: true,
    references: { model: 'Users', key: 'id' },
    onDelete: 'SET NULL'
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.JSON,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  metadata: {
    type: DataTypes.JSONB
  }
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Section',
});

export default Section;