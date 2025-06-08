const checkPermission = (...allowedPermissions) => {
  return async (req, res, next) => {
    try {
      const permissions = req.apiKeyInfo?.permissions || [];
      const hasAll = allowedPermissions.every(p => permissions.includes(p));
      if (!hasAll) {
        return res.status(403).json({
          message:
            'Forbidden: You do not have permission to access this resource',
        });
      }
      return next();
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error:' + error.message,
      });
    }
  };
};

module.exports = checkPermission;
