// Author相关API服务
import { apiClient } from './api';
import type { Author, EditAuthorDTO } from '../types';

export const authorService = {
  // 获取所有作者
  getAll: (): Promise<Author[]> => {
    return apiClient.get('/Authors');
  },

  // 根据ID获取作者
  getById: (id: number): Promise<Author> => {
    return apiClient.get(`/Authors/${id}`);
  },

  // 创建作者
  create: (data: EditAuthorDTO): Promise<Author> => {
    return apiClient.post('/Authors', data);
  },

  // 更新作者
  update: (id: number, data: EditAuthorDTO): Promise<void> => {
    return apiClient.put(`/Authors/${id}`, data);
  },

  // 删除单个作者
  delete: (id: number): Promise<void> => {
    return apiClient.delete(`/Authors/${id}`);
  },

  // 批量删除作者
  batchDelete: (ids: number[]): Promise<void> => {
    return apiClient.delete('/Authors', { data: ids });
  },
};