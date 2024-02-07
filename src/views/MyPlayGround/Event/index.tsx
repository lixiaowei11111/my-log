import { Button } from "antd";

const Event = () => {
	return (
		<div>
			<Button type="primary" onClick={handleDispatch}>
				触发合成事件
			</Button>
		</div>
	);
};

export default Event;
