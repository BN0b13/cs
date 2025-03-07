'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

  class Media extends Model {
    
    static associate(models) {
      
    }
  }
  Media.init({
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    details: DataTypes.JSONB
  }, {
    sequelize,
    schema: process.env.PG_SCHEMA_NAME,
    modelName: 'Media',
  });

  export default Media;