import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import Router from "@ROUTES/index";

import "@VIEWS/MyPlayGround/TsApply/decorator"; // 装饰器
import "@VIEWS/MyPlayGround/pattern/Observable"; // 观察者

function App() {
	return (
		<BrowserRouter>
			<ConfigProvider locale={zhCN}>
				<Router></Router>
			</ConfigProvider>
		</BrowserRouter>
	);
}

export default App;
