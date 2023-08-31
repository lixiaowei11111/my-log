//stylelint15.x的版本变动规则 Migrating to 15.0. 0https://stylelint.io/migration-guide/to-15/
// stylelint-config-prettier stylelint 15.x以上版本不再需要此插件 https://github.com/prettier/stylelint-config-prettier
// 可以用来限制css 书写顺序的插件 1.stylelint-config-recess-order; 2.stylelint-config-rational-order;

module.exports = {
	extends: [
		"stylelint-config-standard", // stylelint 标准扩展插件
		"stylelint-config-recess-order", // css 书写顺序
	],
	ignoreFiles: ["dist/**/*"],
	overrides: [
		{
			files: ["**/*.less"],
			customSyntax: "postcss-less",
		},
		{
			files: ["*.html", "**/*.html"],
			customSyntax: "postcss-html",
		},
	],
	rules: {
		"string-quotes": "double",
	},
};
