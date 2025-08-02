// 主应用组件
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { router } from '@/router';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

// 设置dayjs为中文
dayjs.locale('zh-cn');

// 创建QueryClient实例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 失败重试次数
      staleTime: 5 * 60 * 1000, // 5分钟内数据被认为是新鲜的
      refetchOnWindowFocus: false // 窗口聚焦时不自动重新获取数据
    },
    mutations: {
      retry: 1 // 变更操作失败重试次数
    }
  }
});

/**
 * 主应用组件
 * 配置全局状态管理、路由、国际化和主题
 */
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 6
          }
        }}
      >
        <RouterProvider router={router} />
        
        {/* 开发环境下显示React Query开发工具 */}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
