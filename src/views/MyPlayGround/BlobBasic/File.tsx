import {
	ChangeEventHandler,
	ChangeEvent,
	useState,
	CompositionEvent,
} from "react";
interface StateType {
	readTsxFile: string | null | ArrayBuffer;
}
/** ChangeEventHnadler 用于定义 onChange函数 ChangeEvent 用于定义event这个参数 */
const File = () => {
	const [state, setState] = useState<StateType>({
		readTsxFile: "",
	});
	const handleInput: ChangeEventHandler<HTMLInputElement> = e => {
		console.log(e, e.target, e.target.files);
	};
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e, e.target, e.target.files);
		const files = e.target.files;
		if (files) {
			const file = files[0];
			const reader = new FileReader();
			reader.readAsText(file); // 异步读取File.tsx文件
			reader.onload = e => {
				console.log(e, "reader loadend");
				const target = e.target;

				target && setState({ readTsxFile: e.target.result });
			};
		}
	};

	const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
	};

	const handleCompositionStart = (e: CompositionEvent<HTMLInputElement>) => {
		console.log(e.target.value);
	};
	const handleCompositionEnd = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
	};
	return (
		<div>
			<span>请选择文件</span>
			<input
				type="file"
				id="file"
				multiple
				accept="image/*,.pdf,video/*"
				onInput={handleInput}
				onChange={handleChange}
			/>
			<input
				type="text"
				onInput={handleTextInput}
				onCompositionStart={handleCompositionStart}
				onCompositionEnd={handleCompositionEnd}
			/>
			<div>
				{typeof state.readTsxFile === "string"
					? state.readTsxFile
					: typeof state.readTsxFile}
			</div>
		</div>
	);
};

export default File;

/**
 * 返回一个包含File类型的files列表
 * 每个 File 对象都有一些只读属性。
		name：本地系统中的文件名。
		size：以字节计的文件大小。
		type：包含文件 MIME 类型的字符串。
		lastModifiedDate：表示文件最后修改时间的字符串。这个属性只有 Chome 实现了。
 */
