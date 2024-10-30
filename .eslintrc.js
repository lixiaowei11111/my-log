module.exports = {
	root: true, // 表示 ESLint 配置文件将在此目录下生效，不会继续往父级目录查找。
	parser: "@typescript-eslint/parser",
	settings: {
		react: {
			version: "detect", // 配置 React 相关的设置，使用 "detect" 自动检测项目中使用的 React 版本。s
		},
	},
	parserOptions: {
		//设置解析器选项，将代码解析为 ECMAScript 模块。
		sourceType: "module",
		ecmaVersion: 2021,
		ecmaFeatures: {
			jsx: true,
		},
		project: "./tsconfig.json", // 指定 TypeScript 配置文件路径
		requireConfigFile: false,
		babelOptions: {
			configFile: "./babelrc",
		},
	},
	env: {
		browser: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"prettier",
		"plugin:prettier/recommended",
		"plugin:storybook/recommended",
	],
	plugins: ["@typescript-eslint", "react", "prettier", "babel", "promise"],
	rules: {
		// ESLint Rules
		"no-console": 0, // 关闭对 console 使用的警告。
		"no-unused-vars": 0, // 关闭对未使用变量的警告。

		// TypeScript Rules
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/no-unused-vars": [0, { argsIgnorePattern: "^_" }],
		"@typescript-eslint/no-non-null-assertion": 0, // 非空断言
		"@typescript-eslint/consistent-type-definitions": "error",
		// 启用 TypeScript 下的未使用变量规则，忽略以 _ 开头的变量。

		// React Rules
		"react/prop-types": 0, // 关闭对 PropTypes 的检查。
		"react/react-in-jsx-scope": 0, // react18 中 jsx语法不再需要引入react
		"react/self-closing-comp": "error", // 自闭合标签

		// Prettier Rules
		"prettier/prettier": 2, // 将 Prettier 错误视为 ESLint 错误。
		// promise
		"promise/no-nesting": "error", // 禁止嵌套的 Promise
	},
	overrides: [
		{
			files: ["*.tsx"],
			rules: {
				"react/prop-types": 0, // Disable prop-types in TypeScript files
			},
		},
	],
};
