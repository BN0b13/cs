'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Auction extends Model {
  
  static associate(models) {
    
  }
}
Auction.init({
  productId: DataTypes.INTEGER,
  type: DataTypes.STRING,
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  disclaimer: DataTypes.STRING,
  bids: DataTypes.JSONB,
  winner: DataTypes.JSONB,
  startDate: DataTypes.STRING,
  expirationDate: DataTypes.STRING,
  status: DataTypes.STRING,
  options: DataTypes.JSONB,
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Auction',
});

export default Auction;