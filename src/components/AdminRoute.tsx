// 管理员路由保护组件
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import toast from 'react-hot-toast';
import { useAuthStore } from "@/store";

interface AdminRouteProps {
  // ReactNode是React中最宽泛的类型定义，表示任何可以被React渲染的内容
  children: React.ReactNode;
}

/**
 * 路由保护组件：
 * 只允许管理员角色访问被保护的路由
 */
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // 检查是否已登录
  if (!isAuthenticated) {
    toast.error("请先登录");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 检查是否为管理员
  if (user?.role !== "Admin") {
    toast.error("权限不足");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
