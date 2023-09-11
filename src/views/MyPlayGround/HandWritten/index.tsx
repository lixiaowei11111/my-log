import { FC } from "react";
import { Button } from "antd";

import { debounce } from "@/hooks/useDebounce";

const HandWritten: FC = () => {
	const handleClickDebounce = () => {
		debounce(() => {
			console.log("debounce");
		}, 2000);
	};
	return (
		<>
			<Button type="primary" onClick={handleClickDebounce}>
				debounce
			</Button>
		</>
	);
};

export default HandWritten;
