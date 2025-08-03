// 主应用组件
import React from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import { router } from "@/router";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";

// 设置dayjs为中文
dayjs.locale("zh-cn");

const queryClient = new QueryClient({
  defaultOptions: {
    // 查询类操作
    queries: {
      retry: 1, // 重试次数
      staleTime: 5 * 60 * 1000, // 5分钟内数据被认为是新鲜的
      refetchOnWindowFocus: false, // 窗口聚焦时不自动重新获取数据
    },
    // 修改类操作
    mutations: {
      retry: 1,
    },
  },
});

/**
 * 主应用组件
 */
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Ant Design 配置 */}
      <ConfigProvider
        locale={zhCN}
        theme={{
          // 主题备选项：darkAlgorithm (暗色主题)、compactAlgorithm (紧凑主题)
          algorithm: theme.defaultAlgorithm,
          token: {
            // 所有组件的主色调和圆角大小
            colorPrimary: "#1890ff",
            borderRadius: 6,
          },
        }}
      >
        
        {/* 路由配置 */}
        <RouterProvider router={router} />

        {/* 开发环境下显示React Query开发工具 */}
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
