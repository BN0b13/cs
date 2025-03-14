'use strict';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: 'roleId' });
    this.hasMany(models.Order, { foreignKey: 'userId' });
    this.hasOne(models.Cart, { foreignKey: 'userId' });
    this.hasOne(models.Company, { foreignKey: 'userId' });
    this.belongsTo(models.Theme, { foreignKey: 'themeId' });
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    emailOriginal: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    billingAddress: DataTypes.JSONB,
    shippingAddress: DataTypes.JSONB,
    favorites: DataTypes.ARRAY(DataTypes.INTEGER),
    subscriptions: DataTypes.ARRAY(DataTypes.INTEGER),
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailToken: DataTypes.STRING,
    passwordToken: DataTypes.STRING,
    credit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    themeId: DataTypes.INTEGER,
    themeInverted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    eula: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    eulaVersion: DataTypes.STRING,
    socials: DataTypes.JSONB,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profilePictureName: DataTypes.STRING,
    profilePicturePath: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('active', 'banned', 'suspended'),
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    schema: process.env.PG_SCHEMA_NAME,
    modelName: 'User',
    indexes: [
      { fields: ['email'], unique: true },
      { fields: ['username'], unique: true },
      { fields: ['roleId'] },
    ],
  }
);

export default User;