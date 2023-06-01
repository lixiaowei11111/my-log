import { RouteObject } from "react-router-dom";
const processPath = (
	routes: RouteObject[],
	rootPath: string,
): RouteObject[] => {
	return routes.map(route => {
		const processedRoute: RouteObject = {
			...route,
			path: processRoutePath(route.path || "/", rootPath),
		};
		if (route.children?.length) {
			processPath(route.children, rootPath);
		}
		// 处理其他路由对象的属性，如果有需要的话
		return processedRoute;
	});
};

function processRoutePath(routePath: string, rootPath: string): string {
	if (routePath.startsWith("/")) {
		return `${rootPath}${routePath}`;
	} else {
		return routePath;
	}
}

export default processPath;
