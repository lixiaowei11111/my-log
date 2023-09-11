import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import NotFound from "@COMPONENTS/Error/404";
import Home from "@VIEWS/Home";
import MainLayout from "@/layouts/MainLayout";

import processPath from "./processPath";

import routeList from "./modules";

const rootPath = process.env.ROOT_PATH;

// 2. 使用 createBrowserRouter 创建
let router: RouteObject[] = [
	{
		// 根目录 重定向
		path: "/", // my-log 来匹配项目名称
		element: <Navigate to="/home" />, ////绝对不能使用 element: <Navigate to="/app" />来重定向子路由,会导致异常错误发生
	},
	{
		element: <MainLayout />,
		children: [
			{
				path: "/home",
				element: <Home />,
			},
		],
	},
	...routeList,
	{
		path: "/404",
		element: <NotFound />,
	},
	{
		path: "*",
		element: <Navigate to="/404" replace />,
	},
];
// const extraRouteInfo: RouteObject = {
// 	loader: null,
// 	action: null,
// 	children: null,
// 	errorElement: <ErrorBoundary />,
// }

// const tempRouter = router.map(v => ({ ...v,  }))
// console.log(tempRouter, 'tempRouter')
if (rootPath) {
	router = processPath(router, rootPath);
}

console.log(router, "router");

const Router = () => {
	return useRoutes(router);
};

export default Router;

// https://reactrouter.com/en/main/upgrading/v5#use-usenavigate-instead-of-usehistory
// v5 迁移至v6时
