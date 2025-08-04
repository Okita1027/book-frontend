import React from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  BookOutlined,
  TagOutlined,
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { useAppStore } from '../store';
import './AdminLayout.scss';

const { Sider, Content } = Layout;

/**
 * 后台管理布局组件
 * 提供左侧导航栏和内容区域
 */
const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

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
        collapsedWidth={80} // 折叠时的宽度
        collapsed={sidebarCollapsed}  // 绑定折叠状态
        className="admin-sider"
        theme="light"
        trigger={null}  // 禁用默认的折叠按钮
      >
        <div className="admin-sider-header">
          {/* 折叠时隐藏标题 */}
          {!sidebarCollapsed && <h3>后台管理</h3>}
          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar} // 切换折叠状态
            className="collapse-btn"
          />
        </div>
        <Menu
          mode="inline"
          theme="light"
          items={siderMenuItems}
          onClick={handleMenuClick}
          className="admin-menu"
        />
      </Sider>
      
      <Content className="admin-content">
        {/* 渲染二级路由 */}
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AdminLayout;