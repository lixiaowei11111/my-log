import React, { ReactElement, ReactNode, useState, useRef } from "react";

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

/** useState */
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

/** useRef */

// type React.FC<P = {}> = React.FunctionComponent<P>
