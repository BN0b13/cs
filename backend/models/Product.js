'use strict';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { foreignKey: 'categoryId' });
    this.hasMany(models.ProductImage, { foreignKey: 'productId' });
    this.hasMany(models.Inventory, { foreignKey: 'productId' });
    this.hasOne(models.Raffle, { foreignKey: 'productId' });
  }
}

Product.init(
  {
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    details: DataTypes.JSONB,
    profile: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  {
    sequelize,
    schema: process.env.PG_SCHEMA_NAME,
    modelName: 'Product',
  }
);

export default Product;