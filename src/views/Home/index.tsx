import CounterByUserReducer from "@COMPONENTS/TsApply/UseReducerApply";
import { ClipboardEventFC, MouseMoveEventFC } from "@COMPONENTS/TsApply/Event";
import useWebSocket from "@/hooks/useWebSocket";
import { Button } from "antd";
const Home = () => {
	const onMessage = (e: MessageEvent) => {
		console.log(e, "onmessage");
	};
	const { ws, sendMessage } = useWebSocket({
		url: "ws://localhost:8080",
		onMessage,
	});
	console.log(ws, "ws");

	return (
		<>
			<ClipboardEventFC></ClipboardEventFC>
			<span>Home Component</span>
			<CounterByUserReducer />
			<MouseMoveEventFC />
			<Button onClick={() => sendMessage("client send message")}>
				client send message
			</Button>
			<Button onClick={() => ws?.close()}>close</Button>
		</>
	);
};

export default Home;
