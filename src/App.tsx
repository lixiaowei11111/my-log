import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import Router from "@ROUTES/index";

import "@VIEWS/MyPlayGround/TsApply/decorator"; // 装饰器
import "@VIEWS/MyPlayGround/pattern/Observable"; // 观察者
import "@VIEWS/MyPlayGround/pattern/002_Proxy";

function App() {
	// location.href = "https://10.219.16.59:8090/#/login"; App内置浏览器不能被跨域跳转?只能在
	return (
		<BrowserRouter>
			<ConfigProvider locale={zhCN}>
				<Router />
			</ConfigProvider>
		</BrowserRouter>
	);
}

export default App;
