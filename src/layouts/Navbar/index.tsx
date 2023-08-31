import { Layout } from "antd";
import "./index.less";

const { Header } = Layout;

const Navbar = () => {
	return (
		<Header className="flex bg-white header">
			<div className="flex text-primary logo">MATRYOSHA</div>
		</Header>
	);
};

export default Navbar;
