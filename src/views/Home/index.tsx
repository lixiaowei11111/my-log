import CounterByUserReducer from "@COMPONENTS/TsApply/UseReducerApply";
import { ClipboardEventFC, MouseMoveEventFC } from "@COMPONENTS/TsApply/Event";
const Home = () => {
	return (
		<>
			<ClipboardEventFC></ClipboardEventFC>
			<span>Home Component</span>
			<CounterByUserReducer />
			<MouseMoveEventFC />
		</>
	);
};

export default Home;
