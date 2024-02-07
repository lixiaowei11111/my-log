import axios from "axios";
import { type AxiosError } from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

const service = axios.create({
	timeout: 1000,
	baseURL: process.env.BASE_API,
});

service.interceptors.request.use(
	config => {
		console.log(config, "config");
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

service.interceptors.response.use();
