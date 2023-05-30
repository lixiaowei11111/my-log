import { Navigate, RouteObject } from "react-router-dom";

import App from "@/App";
import ReduxTest from "@VIEWS/PlayGround/ReduxTest";

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
	{
		path: "/playground",
		element: <Navigate to="/playground/reduxTest"></Navigate>,
		children: [
			{
				path: "/playground/reduxTest",
				element: <ReduxTest />,
			},
		],
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
