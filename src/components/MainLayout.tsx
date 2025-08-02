// 主布局组件
import React from 'react';
import { Layout, Menu, Button, Space, Avatar, Dropdown, Typography } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store';
import type { MenuProps } from 'antd';

const { Header, Content } = Layout;
const { Text } = Typography;

/**
 * 主布局组件
 * 提供顶部导航栏和内容区域
 */
const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();

  // 处理登出
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 顶部菜单项
  const topMenuItems: MenuProps['items'] = [
    {
      key: '/',
      label: '首页',
      icon: <HomeOutlined />
    }
  ];

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header 
        style={{ 
          position: 'fixed',
          zIndex: 1000,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #f0f0f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        {/* 左侧：Logo和导航菜单 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div 
            style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#1890ff',
              marginRight: 32,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            📚 图书管理系统
          </div>
          
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={topMenuItems}
            onClick={handleMenuClick}
            style={{ 
              border: 'none',
              backgroundColor: 'transparent',
              minWidth: 100
            }}
          />
        </div>

        {/* 右侧：用户操作区域 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!isAuthenticated ? (
            // 未登录状态
            <Space>
              <Button 
                type="default"
                onClick={() => navigate('/login')}
                style={{ borderRadius: 6 }}
              >
                登录
              </Button>
              <Button 
                type="primary"
                onClick={() => navigate('/register')}
                style={{ borderRadius: 6 }}
              >
                注册
              </Button>
            </Space>
          ) : (
            // 已登录状态
            <Space size="large">
              <Text style={{ color: '#666' }}>
                欢迎，{user?.name}
              </Text>
              
              {/* 已登录用户：显示退出登录按钮 */}
               <Button 
                 type="primary"
                 icon={<LogoutOutlined />}
                 onClick={handleLogout}
                 style={{ borderRadius: 6 }}
               >
                 退出登录
               </Button>
            </Space>
          )}
        </div>
      </Header>

      {/* 内容区域 */}
      <Content 
        style={{ 
          marginTop: 64, // Header高度
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;