import { UserOutlined } from "@ant-design/icons";
import type { FormItemProps } from "antd";
import { Form, Input, Select } from "antd";
import React from "react";

const { Option } = Select;

interface EmailInputProps extends Omit<FormItemProps, "children"> {
  emailSuffix?: string;
  onSuffixChange?: (value: string) => void;
  placeholder?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  emailSuffix = "@163.com",
  onSuffixChange,
  placeholder = "请输入邮箱地址",
  className = "w-full",
  ...formItemProps
}) => {
  const selectAfter = (
    <Select value={emailSuffix} onChange={onSuffixChange}>
      <Option value="@163.com">@163.com</Option>
      <Option value="@126.com">@126.com</Option>
      <Option value="@qq.com">@qq.com</Option>
    </Select>
  );

  return (
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: "请输入邮箱",
        },
      ]}
      className="form-item"
      {...formItemProps}
    >
      <Input
        addonAfter={selectAfter}
        prefix={<UserOutlined />}
        placeholder={placeholder}
        className={className}
      />
    </Form.Item>
  );
};

export default EmailInput;
