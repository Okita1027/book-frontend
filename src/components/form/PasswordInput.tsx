import { LockOutlined } from "@ant-design/icons";
import type { FormItemProps } from "antd";
import { Form, Input } from "antd";

interface PasswordInputProps extends Omit<FormItemProps, "children"> {
  onSuffixChange?: (value: string) => void;
  placeholder?: string;
}

export default function PasswordInput({
  onSuffixChange,
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
      <Input
        prefix={<LockOutlined />}
        placeholder={placeholder}
        className={className}
      />
    </Form.Item>
  );
}
