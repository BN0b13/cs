import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

class UserPermission extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    this.belongsTo(models.Permission, { foreignKey: 'permissionId', onDelete: 'CASCADE' });
  }
}

UserPermission.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      onDelete: 'CASCADE',
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Permissions', key: 'id' },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    schema: process.env.PG_SCHEMA_NAME,
    modelName: 'UserPermission',
    timestamps: false,
  }
);

export default UserPermission;