// 登录页面
import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Card, Form, Input, message, Space, Typography} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useMutation} from '@tanstack/react-query';
import {userService} from '@/services';
import {useAuthStore} from '@/store';
import type {AuthResponseDTO} from '@/types';

const { Title, Text } = Typography;

interface LoginForm {
  email: string;
  password: string;
}

/**
 * 登录页面组件
 * 提供用户登录功能，支持JWT认证
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  const [form] = Form.useForm<LoginForm>();

  // 获取重定向路径
  const from = (location.state as any)?.from?.pathname || '/';

  // 登录mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginForm) => 
      userService.login({ email, password }),
    onSuccess: (data: AuthResponseDTO) => {
      console.log('登录成功，收到的数据:', data);
      message.success('登录成功！');
      login(data);
      navigate(from, { replace: true });
    },
    onError: (error: any) => {
      console.error('登录失败:', error);
      message.error(error.response?.data?.message || '登录失败，请检查用户名和密码');
    }
  });

  // 处理表单提交
  const handleSubmit = (values: LoginForm) => {
    loginMutation.mutate(values);
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px'
      }}
    >
      <Card 
        style={{ 
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Space 
          direction="vertical" 
          size="large" 
          style={{ width: '100%', textAlign: 'center' }}
        >
          {/* 标题 */}
          <div>
            <Title level={2} style={{ marginBottom: 8 }}>
              图书管理系统
            </Title>
            <Text type="secondary">
              请输入您的账号和密码登录
            </Text>
          </div>

          {/* 登录表单 */}
          <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱地址' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="邮箱地址" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6位字符' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="密码" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loginMutation.isPending}
                style={{ width: '100%' }}
              >
                {loginMutation.isPending ? '登录中...' : '登录'}
              </Button>
            </Form.Item>
          </Form>

          {/* 演示账号信息 */}
          <div style={{ textAlign: 'left' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              演示账号：
            </Text>
            <br />
            <Text code style={{ fontSize: '12px' }}>
              管理员: root@163.com / 123456
            </Text>
            <br />
            <Text code style={{ fontSize: '12px' }}>
              用户: zhangsan@mail.com / 123456
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Login;