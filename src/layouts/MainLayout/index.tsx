import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

const { Content } = Layout;

const MainLayout = () => {
	return (
		<main>
			<Navbar />
			<Layout hasSider>
				<Sidebar />
				<Content>
					<Outlet />
				</Content>
			</Layout>
			<Footer></Footer>
		</main>
	);
};

export default MainLayout;
