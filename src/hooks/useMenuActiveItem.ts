import { useLocation, useNavigate } from "react-router-dom";

export default function useMenuActiveItem(routeIndex: number) {
	// 几级菜单
	const { pathname } = useLocation();
	const navigate = useNavigate(); // useNavigate 替代 useHistory
	const pathItems = pathname.split("/");
	const pathItem = `/${pathItems[routeIndex]}` ?? "";
	console.log(pathname, "pathname");
	console.log(pathItems, "pathItems");

	const setPathItem = (newItemKey: string) => {
		const parentPath = pathItems.slice(0, routeIndex).join("/");
		console.log(parentPath, "parentPath");
		navigate(newItemKey);
	};

	return [pathItem, setPathItem] as const;
}
