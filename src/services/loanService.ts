// Loan相关API服务
import { apiClient } from './api';
import type { LoanVO, EditLoanDTO } from '../types';

export const loanService = {
  // 获取所有借阅记录
  getAll: (): Promise<LoanVO[]> => {
    return apiClient.get('/Loans');
  },

  // 根据ID获取借阅记录
  getById: (id: number): Promise<LoanVO> => {
    return apiClient.get(`/Loans/${id}`);
  },

  // 创建借阅记录
  create: (data: EditLoanDTO): Promise<void> => {
    return apiClient.post('/Loans', data);
  },

  // 更新借阅记录
  update: (id: number, data: EditLoanDTO): Promise<void> => {
    return apiClient.put(`/Loans/${id}`, data);
  },

  // 删除单个借阅记录
  delete: (id: number): Promise<void> => {
    return apiClient.delete(`/Loans/${id}`);
  },

  // 批量删除借阅记录
  batchDelete: (ids: number[]): Promise<void> => {
    return apiClient.delete('/Loans', { data: ids });
  },

  // 归还图书
  returnBook: (id: number): Promise<void> => {
    return apiClient.put(`/Loans/${id}/return`);
  },
};