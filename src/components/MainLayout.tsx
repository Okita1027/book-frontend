import React from "react";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, Space, Typography } from "antd";
import toast from 'react-hot-toast';
import {
  ControlOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";

const { Header, Content } = Layout;
const { Text } = Typography;

/**
 * 主布局组件
 * 提供顶部导航栏和内容区域
 */
// 用户操作区域组件
const UserActions: React.FC<{
  isAuthenticated: boolean;
  user: any;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}> = ({ isAuthenticated, user, onLogin, onRegister, onLogout }) => {
  if (!isAuthenticated) {
    return (
      <Space>
        <Button
          type="default"
          onClick={onLogin}
          style={{ borderRadius: 6 }}
        >
          登录
        </Button>
        <Button
          type="primary"
          onClick={onRegister}
          style={{ borderRadius: 6 }}
        >
          注册
        </Button>
      </Space>
    );
  }

  return (
    <Space size="large">
      <Text style={{ color: "#666" }}>欢迎，{user?.name}</Text>
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        onClick={onLogout}
        style={{ borderRadius: 6 }}
      >
        退出登录
      </Button>
    </Space>
  );
};

// 在MainLayout中使用
const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();

  // 处理登出
  const handleLogout = () => {
    logout();
    toast.success("已退出登录");
    navigate("/");
  };

  // 顶部菜单项
  const topMenuItems: MenuProps["items"] = [
    {
      key: "/",
      label: "首页",
      icon: <HomeOutlined />,
    },
    {
      key: "/admin",
      label: "后台管理",
      icon: <ControlOutlined />,
    },
  ];

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "/admin") {
      // 检查登录状态
      if (!isAuthenticated) {
        toast.error("请先登录");
        navigate("/login");
        return;
      }

      // 检查管理员权限
      if (user?.role !== "Admin") {
        toast.error("权限不足");
        return;
      }
    }
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          zIndex: 100, // 层级置顶
          width: "100%",
          display: "flex",
          alignItems: "center", // 垂直居中对齐
          justifyContent: "space-between", // 两端对齐
          padding: "0 24px",
          backgroundColor: "#FFF",
          borderBottom: "1px solid #F0F0F0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* 左侧：Logo和导航菜单 */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#1890ff",
              marginRight: 32,
              cursor: "pointer", // 鼠标悬停显示手型
            }}
            onClick={() => navigate("/")}
          >
            📚 图书管理系统
          </div>

          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={topMenuItems}
            onClick={handleMenuClick}
          />
        </div>

        {/* 右侧：用户操作区域 */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <UserActions
            isAuthenticated={isAuthenticated}
            user={user}
            onLogin={() => navigate("/login")}
            onRegister={() => navigate("/register")}
            onLogout={handleLogout}
          />
        </div>
      </Header>

      {/* 内容区域 */}
      <Content
        style={{
          marginTop: 64, // Header高度
        }}
      >
        {/* 渲染子路由组件 */}
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
