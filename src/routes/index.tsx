import { Navigate, RouteObject } from "react-router-dom";

import App from "@/App";
import ReduxTest from "@VIEWS/MyPlayGround/ReduxTest";

import processPath from "./processPath";

const rootPath = process.env.parsed.ROOT_PATH;

// 2. 使用 createBrowserRouter 创建
const router: RouteObject[] = [
	{
		// 根目录 重定向
		path: `${rootPath}/`, // my-log 来匹配项目名称
		// element: <Navigate to="/app" />,绝对不能使用 element: <Navigate to="/app" />来重定向子路由,会导致异常错误发生
		children: [
			{
				index: true, // index 属性来确定 children下的默认子路由,
				path: "app",
				element: <App />,
			},
			{
				path: "playground",
				// element: <Navigate to="reduxTest" />,绝对不能使用 element: <Navigate to="reduxTest" />来重定向子路由,会导致异常错误发生
				children: [
					{
						index: true, // index 属性来确定 children下的默认子路由,
						path: "reduxTest",
						element: <ReduxTest />,
					},
				],
			},
		],
	},
	{
		path: `${rootPath}/`,
		element: <Navigate to={`${rootPath}/app`} />,
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

export default processPath(router, rootPath);
