import EmailInput from "@/components/form/EmailInput";
import PasswordInput from "@/components/form/PasswordInput";
import SubmitButton from "@/components/form/SubmitButton";
import { MESSAGES } from "@/constants";
import { userService } from "@/services";
import { useAuthStore } from "@/store";
import type { AuthResponseDTO } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Card, Form, Space, Typography } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.scss";
const { useForm } = Form;

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
  const [form] = useForm<LoginForm>(); // 获取重定向路径
  const from = location.state?.from?.pathname || "/";

  const [emailSuffix, setEmailSuffix] = React.useState("@163.com");

  // 登录mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginForm) =>
      userService.login({ email, password }),
    onSuccess: (data: AuthResponseDTO) => {
      console.log("登录成功，收到的数据:", data);
      toast.success(MESSAGES.SUCCESS.LOGIN);
      login(data);
      navigate(from, { replace: true });
    },
    onError: (error: Error) => {
      console.error("登录失败:", error);
      toast.error(error.message || MESSAGES.ERROR.LOGIN_FAILED);
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
              onFinish={handleSubmit}
              size="large"
              className="login-form"
            >
              <EmailInput
                emailSuffix={emailSuffix}
                onSuffixChange={setEmailSuffix}
                className="form-item"
              />

              <PasswordInput className="form-item" />

              <SubmitButton
                preset="login"
                className="login-button"
                loading={loginMutation.isPending}
              />
            </Form>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default Login;
