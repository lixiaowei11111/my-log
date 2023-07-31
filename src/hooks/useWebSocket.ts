import { useState, useEffect, useRef, useCallback } from "react";

interface WebSocketProps {
	url: `ws${"s" | ""}://${string}:${number}`;
	onMessage: (e: MessageEvent) => void;
	onClose?: () => void;
	onOpen?: () => void;
	onError?: () => void;
}

const useWebSocket = ({
	url,
	onMessage,
	onClose,
	onOpen,
	onError,
}: WebSocketProps) => {
	const [ws, setWs] = useState<WebSocket | null>(null);
	const savedCallback = useRef<(e: MessageEvent) => void>();

	useEffect(() => {
		savedCallback.current = onMessage;
	}, [onMessage]);

	useEffect(() => {
		const ws = new WebSocket(url);

		ws.addEventListener("open", e => {
			console.log(e, "open event");
			if (onOpen) onOpen();
			console.log("connected to " + url);
		});

		ws.addEventListener("close", e => {
			if (onClose) onClose();
			console.log("disconnected from " + url);
		});

		ws.addEventListener("error", e => {
			if (onError) onError();
			console.log("error from " + url);
		});

		ws.addEventListener("message", e => {
			console.log(e, "onmessage");
			if (savedCallback.current) {
				savedCallback.current(e);
			}
		});

		setWs(ws);

		return () => {
			ws.close();
		};
	}, [url, onClose, onError, onOpen]);

	const sendMessage = useCallback(
		(message: string) => {
			if (ws) {
				ws.send(message);
			}
		},
		[ws],
	);

	return { ws, sendMessage };
};

export default useWebSocket;
