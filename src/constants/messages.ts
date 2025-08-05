// 操作提示消息常量
export const MESSAGES = {
  // 成功消息
  SUCCESS: {
    LOGIN: '登录成功',
    LOGOUT: '退出成功',
    SAVE: '保存成功',
    ADD: '添加成功',
    UPDATE: '更新成功',
    DELETE: '删除成功',
    BATCH_DELETE: '批量删除成功',
    OPERATION_SUCCESS: '操作成功',
  },

  // 错误消息
  ERROR: {
    LOGIN_FAILED: '用户名或密码错误',
    NETWORK_ERROR: '网络请求失败',
    OPERATION_FAILED: '操作失败',
    FETCH_DATA_FAILED: '获取数据失败',
    SAVE_FAILED: '保存失败',
    DELETE_FAILED: '删除失败',
    PERMISSION_DENIED: '权限不足',
    AUTH_REQUIRED: '请先登录',
    AUTH_DATA_PARSE_ERROR: '认证数据解析错误',
    UNAUTHORIZED: '未授权，请重新登录',
    GET_BOOK_DETAIL_FAILED: '获取图书详细信息失败，请刷新页面重试',
    GET_BOOK_LIST_FAILED: '获取图书列表失败',
    GET_PUBLISHER_LIST_FAILED: '获取出版社列表失败',
  },

  // 确认消息
  CONFIRM: {
    DELETE_BOOK: '确定要删除这本图书吗？',
    DELETE_PUBLISHER: '确定要删除这个出版社吗？',
    DELETE_SELECTED_BOOKS: (count: number) => `确定要删除选中的 ${count} 本图书吗？`,
    DELETE_SELECTED_PUBLISHERS: (count: number) => `确定要删除选中的 ${count} 个出版社吗？`,
  },

  // 表单验证消息
  VALIDATION: {
    EMAIL_REQUIRED: '请输入邮箱地址',
    EMAIL_INVALID: '请输入有效的邮箱地址',
    PASSWORD_REQUIRED: '请输入密码',
    PASSWORD_MIN_LENGTH: '密码至少6位字符',
    PUBLISHER_NAME_REQUIRED: '请输入出版社名称',
    FIELD_REQUIRED: '此字段为必填项',
  },

  // 加载状态消息
  LOADING: {
    LOGIN: '登录中...',
    SAVING: '保存中...',
    LOADING: '加载中...',
    DELETING: '删除中...',
  },
};