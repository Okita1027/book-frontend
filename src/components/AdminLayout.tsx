// 后台管理布局组件
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  BookOutlined,
  TagOutlined,
  UserOutlined,
  HomeOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import './AdminLayout.css';

const { Sider, Content } = Layout;

/**
 * 后台管理布局组件
 * 提供左侧导航栏和内容区域
 */
const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 左侧菜单项
  const siderMenuItems: MenuProps['items'] = [
    {
      key: '/admin/books',
      label: '图书管理',
      icon: <BookOutlined />
    },
    {
      key: '/admin/categories',
      label: '类别管理',
      icon: <TagOutlined />
    },
    {
      key: '/admin/authors',
      label: '作者管理',
      icon: <UserOutlined />
    },
    {
      key: '/admin/publishers',
      label: '出版社管理',
      icon: <HomeOutlined />
    },
    {
      key: '/admin/users',
      label: '用户管理',
      icon: <TeamOutlined />
    }
  ];

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout className="admin-layout">
      <Sider 
        width={240}
        className="admin-sider"
        theme="light"
      >
        <div className="admin-sider-header">
          <h3>后台管理</h3>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={siderMenuItems}
          onClick={handleMenuClick}
          className="admin-menu"
        />
      </Sider>
      
      <Content className="admin-content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AdminLayout;