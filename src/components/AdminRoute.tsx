// 管理员路由保护组件
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import { useAuthStore } from '@/store';

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * 管理员路由保护组件
 * 只允许管理员角色访问被保护的路由
 */
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // 检查是否已登录
  if (!isAuthenticated) {
    message.warning('请先登录');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 检查是否为管理员
  if (user?.role !== 'Admin') {
    message.error('权限不足');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;