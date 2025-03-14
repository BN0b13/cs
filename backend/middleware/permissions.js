import { Permission, Role, User } from '../models/Associations.js';

const authorize = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [
          { model: Permission, through: 'UserPermissions' },
          { model: Role, include: { model: Permission, through: 'RolePermissions' } },
        ],
      });

      if (!user) return res.status(403).json({ message: 'Unauthorized' });

      const userPermissions = [
        ...user.Role.Permissions.map((p) => p.action),
        ...user.Permissions.map((p) => p.action),
      ];

      const hasPermission = requiredPermissions.every((perm) => userPermissions.includes(perm));

      if (!hasPermission) return res.status(403).json({ message: 'Forbidden' });

      next();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
};

export default authorize;