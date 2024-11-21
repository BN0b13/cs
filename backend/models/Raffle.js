'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Raffle extends Model {
  
  static associate(models) {
    
  }
}
Raffle.init({
  productId: DataTypes.INTEGER,
  ticketIds: DataTypes.ARRAY(DataTypes.INTEGER),
  type: DataTypes.STRING,
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  disclaimer: DataTypes.STRING,
  entries: DataTypes.JSONB,
  entryLimit: DataTypes.INTEGER,
  entryPrice: DataTypes.INTEGER,
  winner: DataTypes.JSONB,
  startDate: DataTypes.STRING,
  completionDate: DataTypes.STRING,
  status: DataTypes.STRING,
  options: DataTypes.JSONB,
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Raffle',
});

export default Raffle;