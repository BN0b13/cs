'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

  class Testimonial extends Model {
    
    static associate(models) {
      
    }
  }
  Testimonial.init({
    userId: {
      type: DataTypes.INTEGER, // References a User (optional)
      allowNull: true,
      references: { model: 'Users', key: 'id' },
      onDelete: 'SET NULL'
    },
    position: DataTypes.INTEGER,
    title: DataTypes.STRING,
    testimonial: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    metadata: DataTypes.JSONB
  }, {
    sequelize,
    schema: process.env.PG_SCHEMA_NAME,
    modelName: 'Testimonial',
  });

  export default Testimonial;