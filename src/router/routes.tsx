// 路由配置
import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout, MainLayout, AdminLayout, AdminRoute } from '@/components';

// 页面组件懒加载
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const BookBrowse = lazy(() => import('@/pages/BookBrowse'));

// 后台管理页面懒加载
const PublisherManagement = lazy(() => import('@/pages/admin/PublisherManagement'));

// 创建路由配置
export const router = createBrowserRouter([
  // 登录和注册页面（独立页面）
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  
  // 前台用户系统（使用MainLayout）
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <BookBrowse />
      },
      // 后台管理系统（嵌套在MainLayout中，受AdminRoute保护）
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: [
          {
            path: 'publishers',
            element: <PublisherManagement />
          },
          {
            index: true,
            element: <Navigate to="publishers" replace />
          }
        ]
      }
    ]
  },
  
  // 404页面重定向到首页
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);