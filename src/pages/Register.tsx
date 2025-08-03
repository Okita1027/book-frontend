import React from "react";
import {Button, Card, Divider, Form, Input, Select, Space, Typography} from "antd";
const { Option } = Select;
import toast from "react-hot-toast";
import {
  LockOutlined,
  MailOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "@/services";
import "./Register.scss";

const { Title, Text } = Typography;

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * 用户注册页面
 */
const Register: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [emailSuffix, setEmailSuffix] = React.useState("@163.com");

  const selectAfter = (
      <Select defaultValue="@163.com" onChange={(value) => setEmailSuffix(value)}>
        <Option value="@163.com">@163.com</Option>
        <Option value="@qq.com">@qq.com</Option>
        <Option value="@126.com">@126.com</Option>
      </Select>
  );

  // 注册请求
  const registerMutation = useMutation({
    mutationFn: (data: Omit<RegisterFormData, "confirmPassword">) => {
      return userService.register(data);
    },
    onSuccess: () => {
      toast.success("注册成功");
      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "注册失败");
    },
  });

  // 处理表单提交
  const handleSubmit = (values: RegisterFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = values;
    // 合并邮箱前缀和后缀
    const fullEmail = registerData.email + emailSuffix;
    registerMutation.mutate({ ...registerData, email: fullEmail });
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <div className="card-body">
          {/* 页面标题 */}
          <div className="register-title">
            <UserAddOutlined className="register-icon" />
            <Title level={2}>用户注册</Title>
            <Text type="secondary">创建您的账户，开始阅读之旅</Text>
          </div>

          {/* 注册表单 */}
          <Form
            form={form}
            name="register"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            className="register-form"
          >
            <Form.Item
              name="name"
              label="用户名"
              rules={[
                { required: true, message: "请输入用户名" },
                { min: 2, message: "用户名至少2个字符" },
                { max: 20, message: "用户名最多20个字符" },
              ]}
              className="form-item"
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入用户名"
                className="form-input"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: "请输入邮箱" },
                // { type: "email", message: "请输入有效的邮箱地址" },
              ]}
              className="form-item"
            >
              <Input
                addonAfter={selectAfter}
                prefix={<MailOutlined />}
                placeholder="请输入邮箱"
                className="form-input"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: "请输入密码" },
                { min: 6, message: "密码至少6个字符" },
              ]}
              className="form-item"
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
                className="form-input"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="确认密码"
              dependencies={["password"]}
              rules={[
                { required: true, message: "请确认密码" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次输入的密码不一致"));
                  },
                }),
              ]}
              className="form-item"
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请再次输入密码"
                className="form-input"
              />
            </Form.Item>

            <Form.Item className="form-item">
              <Button
                type="primary"
                htmlType="submit"
                loading={registerMutation.isPending}
                className="register-button"
              >
                注册
              </Button>
            </Form.Item>
          </Form>

          <Divider className="divider" />

          {/* 登录链接 */}
          <div className="login-link">
            <Space size={10}>
              <Text type="secondary">已有账户？</Text>
              <Link to="/login">
                <Button type="link" className="link-button">
                  立即登录
                </Button>
              </Link>
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
