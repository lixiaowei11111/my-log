import {
	FC,
	MouseEventHandler,
	MouseEvent,
	ChangeEventHandler,
	ChangeEvent,
	FunctionComponent,
	UIEvent,
	UIEventHandler,
	FormEventHandler,
	ClipboardEventHandler,
} from "react";
import { Button, Select } from "antd";

const Option = Select.Option;

//001_click 事件 与 MouseEvent<T=Element> 或者MouseEventHanddler<T=Element>
export const ClickEvent: FC = () => {
	const handleClick: MouseEventHandler = e => {
		const btn = e.currentTarget;
	};
	// 或者
	const handleClickTo = (e: MouseEvent<HTMLButtonElement>) => {
		// e.preventDefault();
		const btn: HTMLButtonElement = e.currentTarget;
	};

	const handleDivClick: MouseEventHandler = e => {
		const div = e.currentTarget;
	};

	function handleImgClick(e: MouseEvent<HTMLImageElement>) {
		const img: HTMLImageElement = e.currentTarget;
	}
	return (
		<>
			<Button onClick={handleClick}>btn</Button>
			<button onClick={handleClickTo}>btn2</button>
			<div onClick={handleDivClick}>dddd</div>
			<img src="" alt="" onClick={handleImgClick} />
		</>
	);
};

// 002_ change事件 : ChangeEvent<T=Element> 和 ChangeEventHandler<T=Element>
// ChangeEventHnadler 用于定义 onChange函数 ChangeEvent 用于定义event这个参数
export const ChangeEventFC: FC = () => {
	const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = e => {
		const value = e.target.value;
	};
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
	};
	return (
		<>
			<select onChange={handleSelectChange}>
				<option value="1">2</option>
			</select>
			<input type="text" value="" onChange={handleInputChange} />
		</>
	);
};

// 003_scroll事件: UIEvent<T=element> UIEventHandle<T=Element>
export const ScrollEvent: FunctionComponent = () => {
	const handleDivScroll: UIEventHandler<HTMLDivElement> = e => {
		const scrollLeft = e.currentTarget.scrollTop;
	};

	const handleUlScroll = (e: UIEvent<HTMLUListElement>) => {
		const scrollLeft = e.currentTarget.scrollLeft;
	};
	return (
		<>
			<div onScroll={handleDivScroll}>
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
			</div>
			<ul onScroll={handleUlScroll}>
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
			</ul>
		</>
	);
};

// 004_submit 事件 FormEvent<T = Element> FormEventHandler<T = Element>
export const SubmitEvent: FC = () => {
	const handleFormSubmit: FormEventHandler<HTMLFormElement> = e => {
		console.log(e, "e");
	};

	return (
		<>
			<form action="" onSubmit={handleFormSubmit}>
				<input type="text" />
			</form>
		</>
	);
};

//005_copy,cut,paste事件:ClipboardEvent<T= Element>;ClipboardEventHandler<T= Element>

export const ClipboardEventFC: FC = () => {
	const handleInputCopy: ClipboardEventHandler<HTMLInputElement> = e => {
		const input = e.currentTarget.value;
		// 获取 DataTransfer 对象
		const clipboardData = e.clipboardData;
		// 获取文本内容
		const text = clipboardData.getData("text/plain");
		console.log(e, input, text, "copy");
	};
	const handleInputCut: ClipboardEventHandler<HTMLInputElement> = e => {
		const input = e.currentTarget.value;
		// 获取 DataTransfer 对象
		const clipboardData = e.clipboardData;
		// 获取文本内容
		const text = clipboardData.getData("text/plain");
		console.log(e, input, text, "cut");
	};
	const handleInputPaste: ClipboardEventHandler<HTMLInputElement> = e => {
		const input = e.currentTarget.value;
		// 获取 DataTransfer 对象
		const clipboardData = e.clipboardData;
		// 获取文本内容
		const text = clipboardData.getData("text/plain");
		console.log(e, input, text, "paste");
	};
	return (
		<>
			<input
				style={{ border: "1px solid #bfa" }}
				type="text"
				onCopy={handleInputCopy}
				onCut={handleInputCut}
				onPaste={handleInputPaste}
			/>
		</>
	);
};

//006_mouseover,mouseout,mouseenter,mouseleave事件:MouseEvent<T = Element>
export const MouseMoveEventFC: FC = () => {
	const handleMouseEnterDiv: MouseEventHandler<HTMLDivElement> = e => {
		console.log(
			"mouse enter",
			e.target === e.currentTarget,
			e.target === e.relatedTarget,
			e.target,
			e.currentTarget,
			e.relatedTarget,
		);
	};
	const handleMouseLeaveDiv: MouseEventHandler<HTMLDivElement> = e => {
		console.log(
			"mouse leave",
			e.target === e.currentTarget,
			e.target === e.relatedTarget,
			e.target,
			e.currentTarget,
			e.relatedTarget,
		);
	};
	const handleMouseOverDiv: MouseEventHandler<HTMLDivElement> = e => {
		console.log(
			"mouse enter",
			e.target === e.currentTarget,
			e.target === e.relatedTarget,
			e.target,
			e.currentTarget,
			e.relatedTarget,
		);
	};
	const handleMouseOutDiv: MouseEventHandler<HTMLDivElement> = e => {
		console.log(
			"mouse leave",
			e.target === e.currentTarget,
			e.target === e.relatedTarget,
			e.target,
			e.currentTarget,
			e.relatedTarget,
		);
	};

	return (
		<>
			<div style={{ marginBottom: "20px" }}>
				<span>MouseEnter 和 MouseLeave</span>
				<div
					style={{
						width: "300px",
						height: "300px",
						backgroundColor: "#fa12da",
					}}
					onMouseEnter={handleMouseEnterDiv}
					onMouseLeave={handleMouseLeaveDiv}
				>
					outer
					<div
						style={{ width: "200px", height: "200px", backgroundColor: "#bfa" }}
					>
						inner
					</div>
				</div>
			</div>

			<div>
				<span>MouseOver 和 Mouseout</span>
				{/* 进入子元素会触发,当前元素的out事件和子元素的over事件 */}
				<div
					style={{
						width: "300px",
						height: "300px",
						backgroundColor: "#fa12da",
					}}
					onMouseOver={handleMouseOverDiv}
					onMouseOut={handleMouseOutDiv}
				>
					outer
					<div
						style={{ width: "200px", height: "200px", backgroundColor: "#bfa" }}
					>
						inner
					</div>
				</div>
			</div>
		</>
	);
};
