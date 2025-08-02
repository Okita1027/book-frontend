// 用户注册页面
import React from 'react';
import {Button, Card, Divider, Form, Input, message, Space, Typography} from 'antd';
import {LockOutlined, MailOutlined, PhoneOutlined, UserAddOutlined, UserOutlined} from '@ant-design/icons';
import {useMutation} from '@tanstack/react-query';
import {Link, useNavigate} from 'react-router-dom';
import {userService} from '@/services';

const { Title, Text } = Typography;

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

/**
 * 用户注册页面
 */
const Register: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // 注册请求
  const registerMutation = useMutation({
    mutationFn: (data: Omit<RegisterFormData, 'confirmPassword'>) => {
      return userService.register(data);
    },
    onSuccess: () => {
      message.success('注册成功！请登录');
      navigate('/login');
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || '注册失败');
    }
  });

  // 处理表单提交
  const handleSubmit = async (values: RegisterFormData) => {
    const { confirmPassword, ...registerData } = values;
    registerMutation.mutate(registerData);
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <Card
        style={{ 
          width: '100%',
          maxWidth: 500,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
            {/* 页面标题 */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <UserAddOutlined 
                style={{ 
                  fontSize: 48, 
                  color: '#1890ff',
                  marginBottom: 16
                }} 
              />
              <Title level={2} style={{ marginBottom: 8 }}>
                用户注册
              </Title>
              <Text type="secondary">
                创建您的账户，开始阅读之旅
              </Text>
            </div>

            {/* 注册表单 */}
            <Form
              form={form}
              name="register"
              onFinish={handleSubmit}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="name"
                label="用户名"
                rules={[
                  { required: true, message: '请输入用户名' },
                  { min: 2, message: '用户名至少2个字符' },
                  { max: 20, message: '用户名最多20个字符' }
                ]}
              >
                <Input 
                  prefix={<UserOutlined />}
                  placeholder="请输入用户名"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined />}
                  placeholder="请输入邮箱"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="手机号（可选）"
                rules={[
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
                ]}
              >
                <Input 
                  prefix={<PhoneOutlined />}
                  placeholder="请输入手机号"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="密码"
                rules={[
                  { required: true, message: '请输入密码' },
                  { min: 6, message: '密码至少6个字符' }
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined />}
                  placeholder="请输入密码"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="确认密码"
                dependencies={['password']}
                rules={[
                  { required: true, message: '请确认密码' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入的密码不一致'));
                    }
                  })
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined />}
                  placeholder="请再次输入密码"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 16 }}>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  loading={registerMutation.isPending}
                  style={{ 
                    width: '100%',
                    height: 48,
                    borderRadius: 8,
                    fontSize: 16
                  }}
                >
                  注册
                </Button>
              </Form.Item>
            </Form>

            <Divider style={{ margin: '24px 0' }} />

            {/* 登录链接 */}
            <div style={{ textAlign: 'center' }}>
              <Space>
                <Text type="secondary">已有账户？</Text>
                <Link to="/login">
                  <Button type="link" style={{ padding: 0 }}>
                    立即登录
                  </Button>
                </Link>
              </Space>
            </div>
      </Card>
    </div>
  );
};

export default Register;