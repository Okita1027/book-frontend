// Publisher（出版社）相关API服务
import { apiClient } from "./api";
import type { Publisher, EditPublisherDTO } from "../types";

export const publisherService = {
  // 获取所有出版社
  getAll: (): Promise<Publisher[]> => {
    return apiClient.get("/Publishers");
  },

  // 根据ID获取出版社
  getById: (id: number): Promise<Publisher> => {
    return apiClient.get(`/Publishers/${id}`);
  },

  // 创建出版社
  create: (data: EditPublisherDTO): Promise<void> => {
    return apiClient.post("/Publishers", data);
  },

  // 更新出版社
  update: (id: number, data: EditPublisherDTO): Promise<void> => {
    return apiClient.put(`/Publishers/${id}`, data);
  },

  // 删除单个出版社
  delete: (id: number): Promise<void> => {
    return apiClient.delete(`/Publishers/${id}`);
  },

  // 批量删除出版社
  batchDelete: (ids: number[]): Promise<void> => {
    return apiClient.delete("/Publishers", { data: ids });
  },
};
