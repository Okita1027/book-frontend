import React from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";

// 预定义的按钮预设类型
type ButtonPreset =
  | "login" // 登录按钮
  | "register" // 注册按钮
  | "logout" // 退出登录按钮
  | "submit" // 通用提交按钮
  | "cancel" // 取消按钮
  | "delete" // 删除按钮
  | "add" // 新增按钮
  | "edit"; // 编辑按钮

interface SubmitButtonProps extends Omit<ButtonProps, "children"> {
  preset?: ButtonPreset;
  text?: string; // 自定义按钮文字
  loadingText?: string; // loading状态下的文字
}

// 按钮配置映射
const buttonConfigs: Record<
  ButtonPreset,
  {
    type: ButtonProps["type"]; // 按钮样式（primary/default）
    htmlType?: ButtonProps["htmlType"]; // HTML类型（submit/button）
    defaultText: string;
    defaultLoadingText?: string;
    danger?: boolean; // 是否为危险操作
  }
> = {
  login: {
    type: "primary",
    htmlType: "submit",
    defaultText: "登录",
    defaultLoadingText: "登录中...",
  },
  register: {
    type: "primary",
    htmlType: "submit",
    defaultText: "注册",
    defaultLoadingText: "注册中...",
  },
  logout: {
    type: "primary",
    htmlType: "button",
    defaultText: "退出登录",
  },
  submit: {
    type: "primary",
    htmlType: "submit",
    defaultText: "提交",
    defaultLoadingText: "提交中...",
  },
  cancel: {
    type: "default",
    htmlType: "button",
    defaultText: "取消",
  },
  delete: {
    type: "primary",
    htmlType: "button",
    defaultText: "删除",
    danger: true,
  },
  add: {
    type: "primary",
    htmlType: "button",
    defaultText: "新增",
  },
  edit: {
    type: "default",
    htmlType: "button",
    defaultText: "编辑",
  },
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  preset = "submit", // 默认为通用提交按钮
  text,
  loadingText,
  loading = false,
  className,
  type, // 允许外部覆盖type
  htmlType, // 允许外部覆盖htmlType
  danger, // 允许外部覆盖danger
  ...buttonProps
}) => {
  const config = preset ? buttonConfigs[preset] : null;

  // 确定显示的文字
  let displayText: string;

  if (loading) {
    // 加载状态：优先使用自定义加载文字，其次使用预设加载文字，最后使用默认文字
    displayText = loadingText || config?.defaultLoadingText || "加载中...";
  } else {
    // 非加载状态：优先使用自定义文字，其次使用预设文字，最后使用默认文字
    displayText = text || config?.defaultText || "按钮";
  }

  return (
    <Button
      // 外部覆盖 > 预设 > 默认
      type={type ?? config?.type ?? "default"}
      htmlType={htmlType ?? config?.htmlType ?? "button"}
      danger={danger ?? config?.danger}
      loading={loading}
      className={className}
      {...buttonProps}
    >
      {displayText}
    </Button>
  );
};

export default SubmitButton;
