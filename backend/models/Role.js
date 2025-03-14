'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import { sequelize } from '../db.js';

class Role extends Model {
  
  static associate(models) {
    this.hasMany(User, { foreignKey: 'roleId' });
  }
}
Role.init({
  role: DataTypes.STRING
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Role',
});

export default Role;