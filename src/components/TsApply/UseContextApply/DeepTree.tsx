import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
export default function DeepTree() {
	const theme = useContext(ThemeContext);
	return (
		<>
			<div>the current theme is {theme}</div>
		</>
	);
}
