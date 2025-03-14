import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

class Permission extends Model {
  static associate(models) {
    this.belongsToMany(models.User, { through: 'UserPermissions' });
    this.belongsToMany(models.Role, { through: 'RolePermissions' });
  }
}

Permission.init(
  {
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    schema: process.env.PG_SCHEMA_NAME,
    modelName: 'Permission',
  }
);

export default Permission;