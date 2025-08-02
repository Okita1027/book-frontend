// Fine（罚款）相关API服务
import { apiClient } from './api';
import type { FineVO } from '../types';

export const fineService = {
  // 获取所有罚款记录
  getAll: (): Promise<FineVO[]> => {
    return apiClient.get('/Fines');
  },

  // 根据ID获取罚款记录
  getById: (id: number): Promise<FineVO> => {
    return apiClient.get(`/Fines/${id}`);
  },

  // 创建罚款记录
  create: (loanId?: number, userId?: number): Promise<void> => {
    return apiClient.post('/Fines', null, {
      params: { loanId, userId }
    });
  },

  // 删除单个罚款记录
  delete: (id: number): Promise<void> => {
    return apiClient.delete(`/Fines/${id}`);
  },

  // 批量删除罚款记录
  batchDelete: (ids: number[]): Promise<void> => {
    return apiClient.delete('/Fines', { data: ids });
  },

  // 支付罚款
  pay: (id: number): Promise<void> => {
    return apiClient.put(`/Fines/${id}/pay`);
  },
};