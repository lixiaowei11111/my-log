import { Navigate, RouteObject } from "react-router-dom";

import App from "@/App";
// 2. 使用 createBrowserRouter 创建
const router: RouteObject[] = [
	{
		// 根目录 重定向
		path: "/",
		element: <Navigate to="/app"></Navigate>,
	},
	{
		path: "/app",
		element: <App />,
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

export default router;
