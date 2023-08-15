import React, { useEffect, useState } from "react";

const ClosureTrap = () => {
	const [counter, setCounter] = useState<number>(1);

	useEffect(() => {
		// setCounter(2);
		setCounter(() => 2);
		setTimeout(() => {
			console.log("closure => counter:", counter);
		}, 1000);
	}, [counter]);

	return <div>ClosureTrap</div>;
};

export default ClosureTrap;
