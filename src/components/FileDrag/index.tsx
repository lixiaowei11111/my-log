import { ChangeEvent, SyntheticEvent } from "react";

const File = () => {
	// [ts在react 事件处理中 event event.target的类型](https://developer.aliyun.com/article/924824#slide-0)
	const handleFileInputChange = (
		e: SyntheticEvent<Element, Event> | ChangeEvent<HTMLInputElement>,
	) => {
		console.log(e, e.target, "file input onChange event");
	};
	return (
		<>
			<input type="file" onChange={handleFileInputChange} />
		</>
	);
};

export default File;
