import axios from "axios";

let baseURL = process.env.REACT_APP_BASE_URL ?? "http://localhost:8080/";
if (baseURL[baseURL?.length - 1] !== "/") {
	baseURL = baseURL + "/";
}
export const apiCall = async (config) => {
	const { url, method, data } = config;
	if (method.toLowerCase() == "get" && data) {
		return { error: "can't use data argument for get request" };
	}
	try {
		const res = await axios({
			method,
			url: `${baseURL}${url}`,
			data,
		});
		return { result: res.data };
	} catch (error) {
		return { error: error?.response?.data ?? error };
	}
};
