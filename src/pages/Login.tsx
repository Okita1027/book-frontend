import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Button, Card, Form, Input, Select, Space, Typography} from "antd";
const { Option } = Select;
import toast from "react-hot-toast";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/services";
import { useAuthStore } from "@/store";
import type { AuthResponseDTO } from "@/types";
import "./Login.scss";

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
  const [form] = Form.useForm<LoginForm>(); // 获取重定向路径
  const from = location.state?.from?.pathname || "/";

  const [emailSuffix, setEmailSuffix] = React.useState("@163.com");

  const selectAfter = (
      <Select defaultValue="@163.com" onChange={(value) => setEmailSuffix(value)}>
        <Option value="@163.com">@163.com</Option>
        <Option value="@qq.com">@qq.com</Option>
        <Option value="@126.com">@126.com</Option>
      </Select>
  );

  // 登录mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginForm) =>
      userService.login({ email, password }),
    onSuccess: (data: AuthResponseDTO) => {
      console.log("登录成功，收到的数据:", data);
      toast.success("登录成功");
      login(data);
      navigate(from, { replace: true });
    },
    onError: (error: Error) => {
      console.error("登录失败:", error);
      toast.error(error.message || "用户名或密码错误");
    },
  });

  // 处理表单提交
  const handleSubmit = (values: LoginForm) => {
    const emailPrefix = values.email;
    const fullEmail = emailPrefix + emailSuffix;
    loginMutation.mutate({ email: fullEmail, password: values.password });
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="card-body">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* 标题 */}
            <div className="login-title">
              <Title level={2}>图书管理系统</Title>
              <Text type="secondary">请输入您的邮箱和密码以进行登录</Text>
            </div>

            {/* 登录表单 */}
            <Form
              form={form}
              name="login"
              onFinish={handleSubmit}
              autoComplete="off"
              size="large"
              className="login-form"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "请输入邮箱地址" },
                  // { type: "email", message: "请输入有效的邮箱地址" },
                ]}
                className="form-item"
              >
                <Input
                  addonAfter={selectAfter}
                  prefix={<UserOutlined />}
                  placeholder="邮箱地址"
                  className="form-input"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "请输入密码" },
                  { min: 6, message: "密码至少6位字符" },
                ]}
                className="form-item"
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="密码"
                  className="form-input"
                />
              </Form.Item>

              <Form.Item className="form-item">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loginMutation.isPending}
                  className="login-button"
                >
                  {loginMutation.isPending ? "登录中..." : "登录"}
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default Login;
