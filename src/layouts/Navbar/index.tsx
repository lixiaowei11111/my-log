import { type MenuProps, Menu, Layout } from "antd";

import useMenuActiveItem from "@/hooks/useMenuActiveItem";

/* Components */
import HeadBand from "@/components/SVG/HeadBand";
import { headModuleList } from "@/constants/Menu";
import "./index.less";

const { Header } = Layout;
const items: MenuProps["items"] = headModuleList.map(item => ({
	label: item.title,
	icon: item.icon ? <i className={item.icon} /> : null,
	key: item.path,
}));

const Navbar = () => {
	const [selectedKey, setSelectedKey] = useMenuActiveItem(1);

	return (
		<Header className="flex bg-white c-header">
			<div className="flex text-primary c-header__logo">
				<HeadBand />
				<span>MATRYOSHKA</span>
			</div>
			<Menu
				className="c-header__menu"
				onSelect={({ key }) => setSelectedKey(key)}
				mode="horizontal"
				selectedKeys={[selectedKey]}
				items={items}
			/>
		</Header>
	);
};

export default Navbar;
