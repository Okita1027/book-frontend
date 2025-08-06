import {lazy, Suspense} from 'react';
import {createBrowserRouter, Navigate} from 'react-router-dom';
import {Spin} from 'antd';
import {AdminLayout, AdminRoute, MainLayout} from '@/components';
import './routes.scss';

// 页面组件懒加载
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const BookBrowse = lazy(() => import('@/pages/BookBrowse'));

// 后台管理页面懒加载
const PublisherManagement = lazy(() => import('@/pages/admin/Publisher'));
const BookManagement = lazy(() => import('@/pages/admin/Book'));

// 创建带有Suspense的懒加载组件包装器
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={
    <div className="route-loading-container">
      <Spin size="large" />
      <div className="loading-text">页面加载中...</div>
    </div>
  }>
    <Component />
  </Suspense>
);

// 路由配置
export const router = createBrowserRouter([
  {
    path: '/login',
    element: withSuspense(Login)
  },
  {
    path: '/register',
    element: withSuspense(Register)
  },
  
  // 前台用户系统（使用MainLayout）
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: withSuspense(BookBrowse)
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
            index: true,
            element: <Navigate to="books" replace />
          },
          {
            path: 'publishers',
            element: withSuspense(PublisherManagement)
          },
          {
            path: 'books',
            element: withSuspense(BookManagement)
          },
        ]
      }
    ]
  },
  // 通配符路由，匹配所有路径，重定向到首页
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);