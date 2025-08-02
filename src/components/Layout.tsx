// 主布局组件
import React, { Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout as AntLayout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Spin,
  theme,
  Typography
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  BookOutlined,
  UserOutlined,
  TeamOutlined,
  TagsOutlined,
  BankOutlined,
  FileTextOutlined,
  DollarOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useAuthStore, useAppStore } from '@/store';

const { Header, Sider, Content } = AntLayout;
const { Text } = Typography;

/**
 * 主布局组件
 * 包含侧边栏导航、顶部栏和内容区域
 */
const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  // 状态管理
  const { user, logout, isAdmin } = useAuthStore();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  // 菜单项配置
  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘'
    },
    {
      key: '/books',
      icon: <BookOutlined />,
      label: '图书管理'
    },
    {
      key: '/loans',
      icon: <FileTextOutlined />,
      label: '借阅管理'
    },
    {
      key: '/fines',
      icon: <DollarOutlined />,
      label: '罚款管理'
    },
    // 管理员专用菜单
    ...(isAdmin() ? [
      {
        key: '/authors',
        icon: <TeamOutlined />,
        label: '作者管理'
      },
      {
        key: '/categories',
        icon: <TagsOutlined />,
        label: '分类管理'
      },
      {
        key: '/publishers',
        icon: <BankOutlined />,
        label: '出版社管理'
      },
      {
        key: '/users',
        icon: <UserOutlined />,
        label: '用户管理'
      }
    ] : [])
  ];

  // 用户下拉菜单
  const userMenuItems = [
    {
      key: 'profile',
      icon: <SettingOutlined />,
      label: '个人设置',
      onClick: () => navigate('/profile')
    },
    {
      type: 'divider' as const
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        logout();
        navigate('/login');
      }
    }
  ];

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      {/* 侧边栏 */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={sidebarCollapsed}
        theme="dark"
      >
        <div 
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          {sidebarCollapsed ? '图' : '图书管理系统'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      <AntLayout>
        {/* 顶部栏 */}
        <Header 
          style={{ 
            padding: '0 16px', 
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Text>欢迎，{user?.name}</Text>
            <Dropdown 
              menu={{ items: userMenuItems }}
              placement="bottomRight"
            >
              <Avatar 
                style={{ cursor: 'pointer' }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </div>
        </Header>

        {/* 内容区域 */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: 8
          }}
        >
          <Suspense 
            fallback={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: 200 
              }}>
                <Spin size="large" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;