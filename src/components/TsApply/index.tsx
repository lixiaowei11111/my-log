import React from "react";

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

// type React.FC<P = {}> = React.FunctionComponent<P>
