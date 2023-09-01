import { useState } from "react";
import { type MenuProps, Menu, Layout } from "antd";

import HeadBand from "@/components/SVG/HeadBand";

import { headModuleList } from "@/constants/Menu";
import "./index.less";

const { Header } = Layout;
const items: MenuProps["items"] = headModuleList.map(item => ({
	label: item.title,
	icon: <i className={item.icon} />,
	key: item.module,
}));

const Navbar = () => {
	const [current, setCurrent] = useState("admin");

	const onClick: MenuProps["onClick"] = e => {
		console.log("click ", e);
		setCurrent(e.key);
	};
	return (
		<Header className="flex bg-white c-header">
			<div className="flex text-primary c-header__logo">
				<HeadBand />
				<span>MATRYOSHKA</span>
			</div>
			<Menu
				className="c-header__menu"
				onClick={onClick}
				selectedKeys={[current]}
				mode="horizontal"
				items={items}
			/>
		</Header>
	);
};

export default Navbar;
