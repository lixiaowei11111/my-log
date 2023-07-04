import CounterByUserReducer from "@COMPONENTS/TsApply/UseReducerApply";
import { ClipboardEventFC } from "@COMPONENTS/TsApply/Event";
const Home = () => {
	return (
		<>
			<ClipboardEventFC></ClipboardEventFC>
			<span>Home Component</span>
			<CounterByUserReducer />
		</>
	);
};

export default Home;
