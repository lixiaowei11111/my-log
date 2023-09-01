export interface HeadModuleType {
	path: `/${string}`;
	key: number;
	icon?: `icon icon-${string}`;
	title: string;
	auth?: boolean;
	module: string;
}

export const headModuleList: HeadModuleType[] = [
	{
		path: "/admin",
		key: 1,
		icon: "icon icon-customer",
		title: "Admin",
		auth: false,
		module: "admin",
	},
	{
		path: "/playground",
		key: 2,
		icon: "icon icon-kaishiceshi",
		title: "Playground",
		auth: false,
		module: "playground",
	},
];
