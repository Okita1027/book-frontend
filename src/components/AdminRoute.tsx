import React, { useRef } from "react";
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
  const hasShownToast = useRef(false);

  // 检查是否已登录
  if (!isAuthenticated) {
    /**
     * 因为使用了<Strict Mode>会导致双重渲染，
     * 所以这里使用ref来记录是否已经显示过toast，避免出现重复显示
     */
    if (!hasShownToast.current) {
      hasShownToast.current = true;
      toast.error("请先登录");
    }
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
