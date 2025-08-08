// 基础分页参数接口(用于Ant Design中ProTable的request形参声明)
export interface BaseRequestParams {
  pageSize?: number;
  current?: number;
}

// 后端定义的分页请求体
export interface PaginationRequest {
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: "ascend" | "descend";
}

// 后端定义的请求响应体
export interface PaginationResponse<T> {
  pageIndex: number;
  pageSize: number;
  total: number;
  items: T[];
}
