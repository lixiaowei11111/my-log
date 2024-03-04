import { Button } from "antd";
import { useCounterStore } from "./store";
const Zustand = () => {
	const counter = useCounterStore(state => state.counter);

	const handleCounterInCrease = useCounterStore(state => state.increase);
	return (
		<>
			<div>zustand get counter from useCounterStore {counter}</div>
			<Button type="primary" onClick={handleCounterInCrease}>
				increase
			</Button>
		</>
	);
};

export default Zustand;
