import { UsernameInput, EmailInput, PasswordInput, SubmitButton } from "@/components/form";
import { userService } from "@/services";
import { UserAddOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Divider, Form, Space, Typography } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
const { useForm } = Form;

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
  const [form] = useForm();
  const navigate = useNavigate();
  const [emailSuffix, setEmailSuffix] = useState("@163.com");

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
            size="large"
            className="register-form"
          >
            <UsernameInput className="form-item" />
            <EmailInput
              emailSuffix={emailSuffix}
              onSuffixChange={setEmailSuffix}
              className="form-item"
            />
            <PasswordInput
              name="password"
              className="form-item"
            />
            <PasswordInput
              name="confirmPassword"
              className="form-item"
              placeholder="请输入确认密码"
              dependencies={["password"]}
              rules={[
                { required: true, message: "请输入确认密码" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次输入的密码不一致"));
                  },
                }),
              ]}
            />
            <SubmitButton
              preset="register"
              loading={registerMutation.isPending}
              className="register-button"
            />
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
