import { Button } from "antd";

const Counter = () => {
	const handleThrowError = () => {
		throw new Error("this is a Error constructor init params");
	};
	return (
		<>
			<span>Counter</span>
			<Button onClick={handleThrowError}>throw error</Button>
		</>
	);
};

export default Counter;
