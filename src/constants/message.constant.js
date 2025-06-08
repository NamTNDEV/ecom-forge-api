const ERROR_MESSAGES = {
  INVALID_REQUEST: 'Invalid request',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden access',
  NOT_FOUND: 'Resource not found',
  CONFLICT: 'Conflict occurred',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  SERVICE_UNAVAILABLE: 'Service unavailable',
  UNPROCESSABLE_ENTITY: 'Unprocessable entity',
  BAD_REQUEST: 'Bad request',

  // Custom messages
  MISSING_API_KEY: 'API key is required',
  INVALID_API_KEY: 'Invalid API key provided',
  INSUFFICIENT_PERMISSIONS:
    'You do not have permission to access this resource',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials provided',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
};

const SUCCESS_MESSAGES = {
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  OPERATION_SUCCESSFUL: 'Operation completed successfully',

  // Custom messages
  LOGIN_SUCCESSFUL: 'Login successful',
  LOGOUT_SUCCESSFUL: 'Logout successful',
};

module.exports = {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
