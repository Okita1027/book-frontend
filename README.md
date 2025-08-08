# 图书管理系统 React 前端

## 项目概述

这是一个基于 React 18+ 和 TypeScript 开发的现代化图书管理系统前端应用，采用最新的前端技术栈，为图书馆管理提供完整的 Web 解决方案。项目采用响应式设计，支持桌面端和移动端访问。

## 技术架构

### 前端技术栈
- **框架**: React 19.1.0 + TypeScript 5.8.3
- **构建工具**: Vite 7.0.4
- **路由管理**: React Router 7.7.1
- **状态管理**: Zustand 5.0.7 (轻量级状态管理)
- **数据请求**: TanStack React Query 5.84.1 + Axios 1.11.0
- **UI 组件库**: Ant Design 5.26.7
- **样式方案**: UnoCSS 66.4.1 + Sass 1.89.2
- **表单处理**: React Hook Form 7.61.1
- **消息提示**: React Hot Toast 2.5.2
- **日期处理**: Day.js 1.11.13
- **工具库**: Lodash 4.17.21 + Ramda 0.31.3

### 开发工具
- **代码检查**: ESLint 9.30.1
- **类型检查**: TypeScript
- **热更新**: Vite HMR
- **开发调试**: React Query Devtools

### 后端 API
- **API 规范**: OpenAPI 3.0.1
- **基础 URL**: http://localhost:8888 (开发环境)
- **认证方式**: JWT Bearer Token
- **数据格式**: JSON

## 开发环境要求

- **Node.js**: 18.0 或更高版本
- **包管理器**: pnpm (推荐) 或 npm/yarn
- **浏览器**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **IDE**: Visual Studio Code (推荐) 或其他支持TypeScript的编辑器
- **后端服务**: 图书管理系统后端API (运行在 http://localhost:8888)
- **网络**: 需要访问后端API服务的网络连接

## 项目结构

```

## 安装与运行

### 1. 克隆项目
```bash
git clone <repository-url>
cd book-frontend
```

### 2. 安装依赖
```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 3. 配置环境
- 确保后端API服务正在运行在 `http://localhost:8888`
- 如需修改API地址，请编辑 `vite.config.ts` 中的代理配置

### 4. 启动开发服务器
```bash
# 使用 pnpm
pnpm dev

# 或使用 npm
npm run dev

# 或使用 yarn
yarn dev
```

### 5. 构建生产版本
```bash
# 使用 pnpm
pnpm build

# 或使用 npm
npm run build

# 或使用 yarn
yarn build
```

### 6. 预览生产版本
```bash
# 使用 pnpm
pnpm preview

# 或使用 npm
npm run preview

# 或使用 yarn
yarn preview
```

应用将在 `http://localhost:5173` 上运行（开发模式）。

## 功能特性

### 🔐 用户认证
- JWT令牌认证
- 自动登录状态保持
- 权限控制和角色管理
- 登录状态持久化

### 📚 图书管理
- 图书信息的增删改查
- 图书搜索和筛选
- 分页浏览图书列表
- 图书详情查看
- 图书分类管理

### 👥 作者管理
- 作者信息维护
- 作者与图书关联
- 作者详情查看

### 🏢 出版社管理
- 出版社信息管理
- 出版社与图书关联
- 出版社详情维护

### 📖 借阅管理
- 图书借阅和归还
- 借阅历史查询
- 借阅状态跟踪
- 按用户名查询借阅记录

### 💰 罚款管理
- 逾期罚款计算
- 罚款记录查询
- 罚款状态管理
- 按用户名查询罚款记录

### 👤 用户管理
- 用户注册和登录
- 用户信息管理
- 用户角色分配
- 管理员权限控制

### 🎨 界面特性
- 现代化React界面
- Ant Design组件库
- UnoCSS原子化CSS
- 响应式布局设计
- 优雅的加载和错误处理
- 消息提示和确认对话框

## 开发指南

### 代码规范
- 遵循TypeScript和React最佳实践
- 使用ESLint进行代码检查
- 组件采用函数式组件 + Hooks
- 使用TypeScript进行类型检查
- 遵循Ant Design设计规范

### 项目架构
- **Components**: 可复用的UI组件
- **Pages**: 页面级组件
- **Services**: API服务调用层
- **Store**: Zustand状态管理
- **Types**: TypeScript类型定义
- **Router**: React Router路由配置

### 添加新功能
1. 在 `types/` 中定义TypeScript类型
2. 在 `services/` 中创建API服务函数
3. 在 `store/` 中添加状态管理（如需要）
4. 在 `pages/` 或 `components/` 中实现UI组件
5. 在 `routes.tsx` 中配置路由（如需要）

### 状态管理
- 使用Zustand进行全局状态管理
- 认证状态通过 `authStore` 管理
- 支持状态持久化到localStorage

### API调用
- 使用Axios进行HTTP请求
- 统一的错误处理和拦截器
- 自动添加JWT认证头
- 支持请求和响应拦截

### 样式方案
- 使用UnoCSS原子化CSS框架
- Ant Design组件库提供基础组件
- 支持响应式设计

### 调试技巧
- 使用浏览器开发者工具
- React Developer Tools扩展
- 查看Network面板检查API请求
- 使用console.log进行调试
- Zustand DevTools支持
book-frontend/
├── public/                    # 静态资源
│   ├── book-backend.openapi.json  # API文档
│   ├── vite.svg
│   └── 原型.png
├── src/
│   ├── components/            # 公共组件
│   │   ├── AdminLayout.tsx    # 管理后台布局
│   │   ├── AdminRoute.tsx     # 管理员路由守卫
│   │   ├── MainLayout.tsx     # 主布局组件
│   │   ├── form/              # 表单组件
│   │   └── index.ts
│   ├── pages/                 # 页面组件
│   │   ├── Login.tsx          # 登录页面
│   │   ├── Register.tsx       # 注册页面
│   │   ├── BookBrowse.tsx     # 图书浏览页面
│   │   ├── UnoDemo.tsx        # UnoCSS演示页面
│   │   └── admin/             # 管理后台页面
│   │       ├── Author.tsx     # 作者管理
│   │       ├── Book.tsx       # 图书管理
│   │       └── Publisher.tsx  # 出版社管理
│   ├── services/              # API服务层
│   │   ├── api.ts             # API基础配置
│   │   ├── authService.ts     # 认证服务
│   │   ├── bookService.ts     # 图书服务
│   │   ├── authorService.ts   # 作者服务
│   │   ├── publisherService.ts # 出版社服务
│   │   ├── categoryService.ts # 分类服务
│   │   ├── loanService.ts     # 借阅服务
│   │   ├── fineService.ts     # 罚款服务
│   │   ├── userService.ts     # 用户服务
│   │   └── index.ts
│   ├── store/                 # 状态管理
│   │   ├── authStore.ts       # 认证状态
│   │   ├── appStore.ts        # 应用状态
│   │   └── index.ts
│   ├── types/                 # TypeScript类型定义
│   │   ├── Auth.d.ts          # 认证相关类型
│   │   ├── Book.d.ts          # 图书相关类型
│   │   ├── Author.d.ts        # 作者相关类型
│   │   ├── Publisher.d.ts     # 出版社相关类型
│   │   ├── Category.d.ts      # 分类相关类型
│   │   ├── Loan.d.ts          # 借阅相关类型
│   │   ├── Fine.d.ts          # 罚款相关类型
│   │   ├── User.d.ts          # 用户相关类型
│   │   ├── Pagination.d.ts    # 分页相关类型
│   │   └── index.d.ts
│   ├── router/                # 路由配置
│   │   ├── routes.tsx         # 路由定义
│   │   └── index.ts
│   ├── constants/             # 常量定义
│   │   ├── messages.ts        # 消息常量
│   │   └── index.ts
│   ├── assets/                # 静态资源
│   │   └── react.svg
│   ├── App.tsx                # 根组件
│   ├── main.tsx               # 应用入口
│   ├── index.css              # 全局样式
│   └── vite-env.d.ts          # Vite类型声明
├── .gitignore                 # Git忽略文件
├── eslint.config.js           # ESLint配置
├── index.html                 # HTML模板
├── package.json               # 项目配置
├── pnpm-lock.yaml            # 依赖锁定文件
├── tsconfig.json             # TypeScript配置
├── tsconfig.app.json         # 应用TypeScript配置
├── tsconfig.node.json        # Node.js TypeScript配置
├── uno.config.ts             # UnoCSS配置
├── vite.config.ts            # Vite配置
└── README.md                 # 项目说明
```