// 导出所有类型定义

export * from './Author';
export * from './Book';
export * from './Category';
export * from './Publisher';
export * from './User';
export * from './Loan';
export * from './Fine';
export * from './Auth';

// 基础分页参数接口(用于Ant Design中ProTable的request形参声明)
export interface BaseRequestParams {
  pageSize?: number;
  current?: number;
}