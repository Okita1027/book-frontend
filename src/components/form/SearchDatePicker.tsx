import React from "react";
import { DatePicker, Typography } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export interface SearchDatePickerProps extends Omit<DatePickerProps, "onChange" | "defaultValue"> {
  label: string;
  valueRef: React.MutableRefObject<string>;
}

/**
 * 通用搜索日期选择器组件
 * 用于图书浏览页面的日期范围搜索
 */
const SearchDatePicker: React.FC<SearchDatePickerProps> = ({
  label,
  valueRef,
  ...datePickerProps
}) => {
  return (
    <>
      <div className="search-label">
        <Text strong>{label}</Text>
      </div>
      <DatePicker
        allowClear
        size="large"
        defaultValue={valueRef.current ? dayjs(valueRef.current) : null}
        onChange={(date) => {
          valueRef.current = date ? date.format("YYYY-MM-DD") : "";
        }}
        className="search-datepicker"
        {...datePickerProps}
      />
    </>
  );
};

export default SearchDatePicker;