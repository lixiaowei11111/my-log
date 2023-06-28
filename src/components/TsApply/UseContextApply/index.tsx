import { useState } from "react";
import type { ThemeContextType } from "./ThemeContext";
import { ThemeContext } from "./ThemeContext";
import DeepTree from "./DeepTree";

/**
 * useContext 和 Class Component一样,使用Provider来给背其包裹的组件提供值,
 * createContext创建Context组件(对象),该组件的Provider提供范围,useContext(ContextObject)获取
 */

const WrapC: React.FC = () => {
	const [theme, setTheme] = useState<ThemeContextType>("light");
	return (
		<div>
			<ThemeContext.Provider value={theme}>
				<DeepTree />
			</ThemeContext.Provider>
		</div>
	);
};
