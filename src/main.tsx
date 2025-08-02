// 应用入口文件
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import './index.css';

// 创建根节点并渲染应用
const root = createRoot(document.getElementById('root')!);
root.render(<App />);

// 开发环境下启用热模块替换
if (import.meta.hot) {
  import.meta.hot.accept();
}
