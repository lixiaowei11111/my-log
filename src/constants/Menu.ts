export interface HeadModuleType {
	path: `/${string}`;
	key: number;
	icon?: `icon-${string}`;
	title: string;
	auth?: boolean;
	module: string;
}

export const headModuleList: HeadModuleType[] = [];
