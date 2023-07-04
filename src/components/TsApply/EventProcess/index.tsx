import { Input, Button } from "antd";
import React from "react";

function EventProcess() {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// e的事件类型泛型
		console.log(e);
	};

	const hanldeChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		console.log(e);
	};
	return (
		<div>
			<Input onChange={handleChange} />
			<Input onChange={hanldeChange} />
		</div>
	);
}

export default EventProcess;

/**
 * 1. e的事件类型
 * 作为一个事件对象,不同的事件有不同的 event type
 * 常见的Event 事件对象如下：
		• 剪切板事件对象：ClipboardEvent<T = Element>
		• 拖拽事件对象：DragEvent<T = Element>
		• 焦点事件对象：FocusEvent<T = Element>
		• 表单事件对象：FormEvent<T = Element>
		• Change事件对象：ChangeEvent<T = Element>
		• 键盘事件对象：KeyboardEvent<T = Element>
		• 鼠标事件对象：MouseEvent<T = Element, E = NativeMouseEvent>
		• 触摸事件对象：TouchEvent<T = Element>
		• 滚轮事件对象：WheelEvent<T = Element>
		• 动画事件对象：AnimationEvent<T = Element>
		• 过渡事件对象：TransitionEvent<T = Element>
	* 可以看到，这些Event事件对象的泛型中都会接收一个Element元素的类型，这个类型就是我们绑定这个事件的标签元素的类型
 */

/**
 * 2. 事件函数处理类型
 * 	type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"];
		type ReactEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;
		// 剪切板事件处理函数
		type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
		// 复合事件处理函数
		type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>;
		// 拖拽事件处理函数
		type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
		// 焦点事件处理函数
		type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
		// 表单事件处理函数
		type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
		// Change事件处理函数
		type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
		// 键盘事件处理函数
		type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
		// 鼠标事件处理函数
		type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
		// 触屏事件处理函数
		type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
		// 指针事件处理函数
		type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
		// 界面事件处理函数
		type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
		// 滚轮事件处理函数
		type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
		// 动画事件处理函数
		type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
		// 过渡事件处理函数
		type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;
 */

/**
 * 3.标签 类型
 * 4. 标签属性类型 用于封装自定义组件
 */
