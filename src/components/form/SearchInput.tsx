import React from "react";
import { Input, Typography } from "antd";
import type { InputProps } from "antd";

const { Text } = Typography;

export interface SearchInputProps extends Omit<InputProps, "onChange"> {
  label: string;
  valueRef: React.MutableRefObject<string>;
  onSearch?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * 通用搜索输入框组件
 * 用于图书浏览页面的各种搜索条件输入
 */
const SearchInput: React.FC<SearchInputProps> = ({
  label,
  valueRef,
  onSearch,
  onKeyDown,
  ...inputProps
}) => {
  return (
    <>
      <div className="search-label">
        <Text strong>{label}</Text>
      </div>
      <Input
        allowClear
        size="large"
        defaultValue={valueRef.current}
        onChange={(e) => {
          valueRef.current = e.target.value;
        }}
        onPressEnter={onSearch}
        onKeyDown={onKeyDown}
        className="search-input"
        {...inputProps}
      />
    </>
  );
};

export default SearchInput;