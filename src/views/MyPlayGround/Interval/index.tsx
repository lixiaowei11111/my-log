import { FC, useState, useEffect, useRef } from "react";
import { Button } from "antd";

export const Interval: FC = () => {
	const [counter, setCounter] = useState<number>(0);
	const timerRef = useRef<NodeJS.Timer | null>(null);

	useEffect(() => {
		timerRef.current = setInterval(() => {
			setCounter(prevCounter => prevCounter + 1);
		}, 1000);

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, []);

	return (
		<div>
			<span>counter: {counter}</span>
			<Button
				onClick={() => timerRef.current && clearInterval(timerRef.current)}
			>
				停止
			</Button>
		</div>
	);
};

// export const Interval: FC = () => {
// 	const [counter, setCounter] = useState<number>(0);
// 	const timer = setInterval(() => {
// 		setCounter(counter + 1);
// 		console.log(timer, "setInterval");
// 	}, 5000);
// 	return (
// 		<div>
// 			<span>counter:{counter}</span>
// 			<Button
// 				onClick={() => {
// 					console.log(timer, "click timer");

// 					clearInterval(timer);
// 					console.log("click stop");
// 				}}
// 			>
// 				停止
// 			</Button>
// 		</div>
// 	);
// };
