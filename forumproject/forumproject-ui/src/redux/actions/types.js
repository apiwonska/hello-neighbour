// USER AUTHENTICATION
export const REGISTER_USER_PENDING = 'register_user_pending';
export const REGISTER_USER_FULFILLED = 'register_user_fulfilled';
export const REGISTER_USER_ERRORS = 'register_user_errors';

export const LOGIN_USER_PENDING = 'login_user_pending';
export const LOGIN_USER_FULFILLED = 'login_user_fulfilled';
export const LOGIN_USER_ERRORS = 'login_user_errors';

export const LOGOUT_USER = 'logout_user';

export const RESET_PASSWORD_PENDING = 'reset_password_pending';
export const RESET_PASSWORD_FULFILLED = 'reset_password_fulfilled';
export const RESET_PASSWORD_ERRORS = 'reset_password_errors';

export const RESET_PASSWORD_CONFIRM_PENDING = 'reset_password_confirm_pending';
export const RESET_PASSWORD_CONFIRM_FULFILLED =
  'reset_password_confirm_fulfilled';
export const RESET_PASSWORD_CONFIRM_ERRORS = 'reset_password_confirm_errors';

export const CHANGE_PASSWORD_PENDING = 'change_password_pending';
export const CHANGE_PASSWORD_FULFILLED = 'change_password_fulfilled';
export const CHANGE_PASSWORD_ERRORS = 'change_password_errors';

// FORUM

// Categories
export const FETCH_CATEGORIES_PENDING = 'fetch_categories_pending';
export const FETCH_CATEGORIES_FULFILLED = 'fetch_categories_fulfilled';
export const FETCH_CATEGORIES_ERRORS = 'fetch_categories_errors';

// Threads
export const FETCH_THREADS_BY_CATEGORY_PENDING =
  'fetch_threads_by_category_pending';
export const FETCH_THREADS_BY_CATEGORY_FULFILLED =
  'fetch_threads_by_category_fulfilled';
export const FETCH_THREADS_BY_CATEGORY_ERRORS =
  'fetch_threads_by_category_errors';

export const FETCH_THREAD_PENDING = 'fetch_thread_pending';
export const FETCH_THREAD_FULFILLED = 'fetch_thread_fulfilled';
export const FETCH_THREAD_ERRORS = 'fetch_thread_errors';

export const CREATE_THREAD_FULFILLED = 'create_thread_fulfilled';
export const CREATE_THREAD_ERRORS = 'create_thread_errors';

// Posts
export const FETCH_POSTS_BY_THREAD_PENDING = 'fetch_posts_by_thread_pending';
export const FETCH_POSTS_BY_THREAD_FULFILLED =
  'fetch_posts_by_thread_fulfilled';
export const FETCH_POSTS_BY_THREAD_ERRORS = 'fetch_posts_by_thread_errors';

export const FETCH_POSTS_BY_USER_PENDING = 'fetch_posts_by_user_pending';
export const FETCH_POSTS_BY_USER_FULFILLED = 'fetch_posts_by_user_fulfilled';
export const FETCH_POSTS_BY_USER_ERRORS = 'fetch_posts_by_user_errors';

export const CREATE_POST_FULFILLED = 'create_post_fulfilled';
export const CREATE_POST_ERRORS = 'create_post_errors';

export const UPDATE_POST_FULFILLED = 'update_post_fulfilled';
export const UPDATE_POST_ERRORS = 'update_post_errors';

export const DELETE_POST_FULFILLED = 'delete_post_fulfilled';
export const DELETE_POST_ERRORS = 'delete_post_errors';

// Users
export const FETCH_USER_PENDING = 'fetch_user_pending';
export const FETCH_USER_FULFILLED = 'fetch_user_fulfilled';
export const FETCH_USER_ERRORS = 'fetch_user_errors';

export const UPDATE_USER_PENDING = 'update_user_pending';
export const UPDATE_USER_FULFILLED = 'update_user_fulfilled';
export const UPDATE_USER_ERRORS = 'update_user_errors';

export const UPLOAD_AVATAR_PENDING = 'upload_avatar_pending';
export const UPLOAD_AVATAR_FULFILLED = 'upload_avatar_fulfilled';
export const UPLOAD_AVATAR_ERRORS = 'upload_avatar_errors';

// Layout
export const CLOSE_SIDE_DRAWER = 'close_side_drawer';
export const OPEN_SIDE_DRAWER = 'open_side_drawer';
export const SHOW_SIDE_NAVBAR = 'show_side_navbar';
export const HIDE_SIDE_NAVBAR = 'hide_side_navbar';

// Modal
export const MODAL_IS_OPEN = 'modal_is_open';
export const MODAL_IS_CLOSED = 'modal_is_closed';
