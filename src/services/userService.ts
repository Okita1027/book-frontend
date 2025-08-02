// User（用户）相关API服务
import { apiClient } from '@/services/api';
import type {User, EditUserDTO, AuthResponseDTO, UserLoginDTO} from '@/types';

export const userService = {
  // 获取所有用户
  getAll: (): Promise<User[]> => {
    return apiClient.get('/Users');
  },

  // 根据ID获取用户
  getById: (id: number): Promise<User> => {
    return apiClient.get(`/Users/${id}`);
  },

  // 更新用户
  update: (id: number, data: EditUserDTO): Promise<void> => {
    return apiClient.put(`/Users/${id}`, data);
  },

  // 删除单个用户
  delete: (id: number): Promise<void> => {
    return apiClient.delete(`/Users/${id}`);
  },

  // 批量删除用户
  batchDelete: (ids: number[]): Promise<void> => {
    return apiClient.delete('/Users', { data: ids });
  },

  // 用户注册
  register: (data: EditUserDTO): Promise<User> => {
    return apiClient.post('/Users/register', data);
  },

  // 用户登录
  login: (data: UserLoginDTO): Promise<AuthResponseDTO> => {
    return apiClient.post('/Users/login', data);
  },
};