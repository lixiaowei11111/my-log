declare namespace NodeJS {
	interface ProcessEnv {
		parsed: {
			NODE_ENV: string;
			BASE_API: string;
			ROOT_PATH: string;
		};
	}
}
