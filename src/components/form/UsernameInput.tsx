import { UserOutlined } from "@ant-design/icons";
import type { FormItemProps } from "antd";
import { Form, Input } from "antd";
import React from "react";

interface UsernameInputProps extends Omit<FormItemProps, "children"> {
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}

const UsernameInput: React.FC<UsernameInputProps> = ({
  placeholder = "请输入用户名",
  minLength = 2,
  maxLength = 20,
  className = "w-full",
  ...formItemProps
}) => {
  return (
    <Form.Item
      name="name"
      rules={[
        { required: true, message: "请输入用户名" },
        { min: minLength, message: `用户名至少${minLength}个字符` },
        { max: maxLength, message: `用户名最多${maxLength}个字符` },
      ]}
      className="form-item"
      {...formItemProps}
    >
      <Input
        prefix={<UserOutlined />}
        placeholder={placeholder}
        className={className}
      />
    </Form.Item>
  );
};

export default UsernameInput;