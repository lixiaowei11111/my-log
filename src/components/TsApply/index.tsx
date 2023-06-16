import React, {
	ReactElement,
	ReactNode,
	useState,
	useRef,
	useEffect,
} from "react";

interface IProps {
	name: string;
}

interface IState {
	age: number;
}

/** class */
class ACC extends React.Component<IProps, IState> {
	state = {
		age: 1,
	};
	render() {
		return <div>{this.props.name}</div>;
	}
}

/** function */

const AFC: React.FC<IProps> = (props: IProps) => {
	eval("throw new Error('111')");
	return <span>{props.name}</span>;
};

const ACD: React.FunctionComponent<IProps> = (props: IProps) => {
	return <span>{props.name}</span>;
};

function ACG(props: IProps): React.ReactNode {
	return (
		<>
			<span>
				使用正常的函数定义不能直接使用 React.FC或者React.FunctionComponent
				了,上述定义其实相当于定义一个变量类型为函数
			</span>
		</>
	);
}

// type React.FC<P = {}> = React.FunctionComponent<P>

// JSX.Element 表示正常的jsx元素的类型
//React.ReactElement 包含 JSX.Element,
// React.ReactNode 包含 React.ReactElement ,null,string,number,boolean,ReactNodeArray等

/** 1. useState */
const ACE: React.FC<IProps> = (props: IProps): ReactElement | null => {
	// 1. useState 有初始值时自动推断类型
	const [count, setCount] = useState(0);
	// const count:number;const setCount: React.Dispatch<React.SetStateAction<number>>
	// 2. 未声明初始值时,需要进行显示类型声明,否则类型会变为 undefined
	const [flag, setFlag] = useState<number | null>(null);
	// const flag: number | null
	return (
		<>
			<div>this is a jsx</div>
		</>
	);
};
/* 2. useEffect */
const AFF: React.ForwardRefRenderFunction<React.ReactNode, IProps> = (
	props,
): React.ReactElement => {
	// FC表示 这是一个函数式组件,不能返回包含null的ReactNode类型
	useEffect(() => {
		console.log("fc mounted update exexute");
		return () => {
			console.log("fc destory");
		};
	});
	return (
		<>
			<span>aaa</span>
		</>
	);
};

const AffCopy = React.forwardRef(AFF);
// const AffCopy: React.ForwardRefExoticComponent<IProps & React.RefAttributes<React.ReactNode>>

/** 3. useRef 和 forwardRef */
const AFG: React.FC = () => {
	const spanRef = React.useRef<HTMLInputElement>(null); // html元素
	const nodeRef = React.useRef<React.ReactNode>(null); // ReactNode, 被forward包裹的元素必须使用类型 ForwardRefRenderFunction来传递ref的类型
	// useRef的T 必须和实际赋值的tag元素对应上
	return (
		<>
			<span>hello</span>
			<input ref={spanRef} type="text" />
			{/* const spanRef: React.RefObject<HTMLInputElement> */}
			<AffCopy ref={nodeRef} name="ybb" />
			{/* const nodeRef: React.MutableRefObject<React.ReactNode> */}
		</>
	);
};

/* 4. useCallback */
const AGA: React.FC = () => {
	const memorized = React.useCallback((p1: string, p2: number) => {
		console.log(p1, p2);
		return p1 + p2;
	}, []);
	return (
		<>
			<span>adad</span>
		</>
	);
};

/* 5. useMemo */
const AGB: React.FC = () => {
	const [p, setP] = React.useState({ p1: 2, p2: 3 });
	const { p1, p2 } = p;
	const memorizedValue = React.useMemo((): string => {
		return p1 + "+" + p2;
	}, []);
	return (
		<>
			<span>13131</span>
		</>
	);
};

const jsx = <div>jsx</div>;
const ele = React.createElement("div", null, "hello");
