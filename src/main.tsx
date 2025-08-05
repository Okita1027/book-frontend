import { createRoot } from "react-dom/client";
import App from "@/App";
import "./index.css";
import { StrictMode } from "react";

// 创建根节点并渲染应用
const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * 热模块替换（HMR）是一种在应用程序运行时动态替换、添加或删除模块的技术，无需刷新整个页面。
 * Vite默认支持HMR，无需手动配置
 */
if (import.meta.hot) {
  import.meta.hot.accept();
}
