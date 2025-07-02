export const UNAUTHORIZED_ERROR = [{ error: 'Unauthorized' }, { status: 401 }] as const;
export const NOT_FOUND_ERROR = [{ error: 'User not found' }, { status: 404 }] as const;
export const BAD_REQUEST_ERROR = (message: string = 'Unknown error') =>
  [{ error: message }, { status: 400 }] as const;
export const USER_DELETED_SUCCESS = [{ message: 'User deleted' }] as const;
