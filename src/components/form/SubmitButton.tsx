import React from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";

// 预定义的按钮类型
type ButtonVariant = 
  | "login"          // 登录按钮
  | "register"       // 注册按钮
  | "logout"         // 退出登录按钮
  | "submit"         // 通用提交按钮
  | "cancel"         // 取消按钮
  | "delete"         // 删除按钮
  | "add"            // 新增按钮
  | "edit"           // 编辑按钮
  | "link";          // 链接按钮

interface SubmitButtonProps extends Omit<ButtonProps, 'children'> {
  variant?: ButtonVariant;
  text?: string;           // 自定义按钮文字
  loadingText?: string;    // loading状态下的文字
}

// 按钮配置映射
const buttonConfigs: Record<ButtonVariant, {
  type: ButtonProps['type'];
  htmlType?: ButtonProps['htmlType'];
  defaultText: string;
  defaultLoadingText?: string;
  danger?: boolean;
}> = {
  login: {
    type: "primary",
    htmlType: "submit",
    defaultText: "登录",
    defaultLoadingText: "登录中..."
  },
  register: {
    type: "primary",
    htmlType: "submit",
    defaultText: "注册",
    defaultLoadingText: "注册中..."
  },
  logout: {
    type: "primary",
    htmlType: "button",
    defaultText: "退出登录"
  },
  submit: {
    type: "primary",
    htmlType: "submit",
    defaultText: "提交",
    defaultLoadingText: "提交中..."
  },
  cancel: {
    type: "default",
    htmlType: "button",
    defaultText: "取消"
  },
  delete: {
    type: "primary",
    htmlType: "button",
    defaultText: "删除",
    danger: true
  },
  add: {
    type: "primary",
    htmlType: "button",
    defaultText: "新增"
  },
  edit: {
    type: "default",
    htmlType: "button",
    defaultText: "编辑"
  },
  link: {
    type: "link",
    htmlType: "button",
    defaultText: "链接"
  }
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  variant = "submit",
  text,
  loadingText,
  loading = false,
  className = "",
  ...buttonProps
}) => {
  const config = buttonConfigs[variant];
  
  // 确定显示的文字
  const displayText = loading && loadingText 
    ? loadingText 
    : loading && config.defaultLoadingText
    ? config.defaultLoadingText
    : text || config.defaultText;

  return (
    <Button
      type={config.type}
      htmlType={config.htmlType}
      danger={config.danger}
      loading={loading}
      className={className}
      {...buttonProps}
    >
      {displayText}
    </Button>
  );
};

export default SubmitButton;