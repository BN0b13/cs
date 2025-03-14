'use strict';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

class Message extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'senderId', as: 'Sender' });
    this.belongsTo(models.User, { foreignKey: 'receiverId', as: 'Receiver' });
  }
}

Message.init(
  {
    senderId: {
      type: DataTypes.INTEGER, // The user sending the message
      allowNull: true, // Null if guest
      references: { model: 'Users', key: 'id' },
      onDelete: 'SET NULL',
    },
    receiverId: {
      type: DataTypes.INTEGER, // The user receiving the message
      allowNull: true, // Null if sent to shop admin
      references: { model: 'Users', key: 'id' },
      onDelete: 'SET NULL',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'read', 'archived'),
      defaultValue: 'pending',
    },
    replied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    schema: process.env.PG_SCHEMA_NAME,
    modelName: 'Message',
  }
);

export default Message;