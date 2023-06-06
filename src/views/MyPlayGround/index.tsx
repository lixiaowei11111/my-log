import { Link, NavLink } from "react-router-dom";

const MyPlayGround = () => {
	return (
		<>
			<span>MyPlayGround</span>
			<Link to="reduxTest">redux</Link>
			<NavLink to="blob">Blob</NavLink>
		</>
	);
};
