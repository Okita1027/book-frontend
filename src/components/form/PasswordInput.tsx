import { LockOutlined } from "@ant-design/icons";
import type { FormItemProps } from "antd";
import { Form, Input } from "antd";

interface PasswordInputProps extends Omit<FormItemProps, "children"> {
  placeholder?: string;
}

export default function PasswordInput({
  placeholder = "请输入密码",
  className = "w-full",
  ...formItemProps
}: PasswordInputProps) {
  return (
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: "请输入密码",
        },
      ]}
      className="form-item"
      {...formItemProps}
    >
      <Input.Password
        prefix={<LockOutlined />}
        placeholder={placeholder}
        className={className}
      />
    </Form.Item>
  );
}
