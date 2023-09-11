export interface HeadModuleType {
	path: `/${string}`;
	key: number;
	icon?: `icon icon-${string}`;
	title: string;
	auth?: boolean;
}

export const headModuleList: HeadModuleType[] = [
	{
		path: "/home",
		key: 1,
		icon: "icon icon-customer",
		title: "Home",
		auth: false,
	},
	{
		path: "/playground",
		key: 2,
		icon: "icon icon-kaishiceshi",
		title: "Playground",
		auth: false,
	},
];
