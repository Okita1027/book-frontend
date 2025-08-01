// Category相关API服务
import { apiClient } from './api';
import type { Category, EditCategoryDTO } from '../types';

export const categoryService = {
  // 获取所有分类
  getAll: (): Promise<Category[]> => {
    return apiClient.get('/Categories');
  },

  // 根据ID获取分类
  getById: (id: number): Promise<Category> => {
    return apiClient.get(`/Categories/${id}`);
  },

  // 创建分类
  create: (data: EditCategoryDTO): Promise<void> => {
    return apiClient.post('/Categories', data);
  },

  // 更新分类
  update: (id: number, data: EditCategoryDTO): Promise<void> => {
    return apiClient.put(`/Categories/${id}`, data);
  },

  // 删除单个分类
  delete: (id: number): Promise<void> => {
    return apiClient.delete(`/Categories/${id}`);
  },

  // 批量删除分类
  batchDelete: (ids: number[]): Promise<void> => {
    return apiClient.delete('/Categories', { data: ids });
  },
};