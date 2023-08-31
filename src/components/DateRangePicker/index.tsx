import React from "react";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

const DateRangePicker: React.FC = () => (
	<Space direction="vertical" size={12}>
		<RangePicker />
		<RangePicker showTime />
		<RangePicker picker="week" />
		<RangePicker picker="month" />
		<RangePicker picker="quarter" />
		<RangePicker picker="year" />
	</Space>
);

export default DateRangePicker;
