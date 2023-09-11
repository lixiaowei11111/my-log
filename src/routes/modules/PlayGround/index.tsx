import { RouteObject, Navigate } from "react-router-dom";

import MainLayout from "@LAYOUTS/MainLayout";

import ReduxTest from "@VIEWS/MyPlayGround/ReduxTest";
import Iterator from "@VIEWS/MyPlayGround/Iterator";
import BlobBasic from "@VIEWS/MyPlayGround/BlobBasic";
import HandWritten from "@/views/MyPlayGround/HandWritten";

const router: RouteObject[] = [
	{
		path: "/playground",
		element: <MainLayout />,
		//element: <Navigate to="/playground/reduxTest" />, // 不要使用Navigate 来重定向至自身的子路由
		////绝对不能使用 element: <Navigate to="reduxTest" />来重定向子路由,会导致异常错误发生
		children: [
			{
				//index: true, // index 属性来确定 children下的默认子路由,
				path: "reduxTest",
				element: <ReduxTest />,
			},
			{
				path: "blobBasic",
				element: <BlobBasic />,
			},
			{
				path: "iterator",
				element: <Iterator />,
			},
			{
				path: "hand",
				element: <HandWritten />,
			},
		],
	},
	{
		path: "/playground",
		element: <Navigate to="/playground/reduxTest" />,
	},
];

export default router;
