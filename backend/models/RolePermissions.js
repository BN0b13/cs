import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

class RolePermissions extends Model {
  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: 'roleId', onDelete: 'CASCADE' });
    this.belongsTo(models.Permission, { foreignKey: 'permissionId', onDelete: 'CASCADE' });
  }
}

RolePermissions.init(
  {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Roles', key: 'id' },
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
    modelName: 'RolePermissions',
    timestamps: false,
  }
);

export default RolePermissions;